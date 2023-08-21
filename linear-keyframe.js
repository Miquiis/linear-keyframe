(function() {
    const path = require('path');
    const fs = require('fs');

    const registeredButtons = [];

    function handleConvertKeyframes() {
        Project.animations.forEach(animation => {
            if (animation.animators) {
                for (const animatorKey in animation.animators) {
                    const animator = animation.animators[animatorKey];
                    if (animator.position) {
                        animator.position.forEach(keyframe => {
                            keyframe.interpolation = "linear"
                        })
                    }
                    if (animator.rotation) {
                        animator.rotation.forEach(keyframe => {
                            keyframe.interpolation = "linear"
                        })
                    }
                    if (animator.scale) {
                        animator.scale.forEach(keyframe => {
                            keyframe.interpolation = "linear"
                        })
                    }
                }
            }
        })
    }

    function registerButton(button) {
        registeredButtons.push(button);
        return button;
    }

    function deleteAllButtons() {
        registeredButtons.forEach(button => button.delete());
    }

    Plugin.register('linear-keyframe', {
        title: 'Linear Keyframe',
        author: 'Miquiis',
        description: 'This plugins converts all keyframes on the animations back to linear.',
        icon: 'movie',
        version: '0.0.1',
        variant: 'both',
        onload() {
            export_bulk = registerButton(new Action('convert_to_linear', {
                name: 'Convert Keyframes to Linear',
                description: 'Convert all keyframe to linear.',
                icon: 'fas.fa-right-left',
                condition(){return Project},
                click: handleConvertKeyframes
            }));
            MenuBar.addAction(export_bulk, 'animation.4');
        },
        onunload() {
            deleteAllButtons();
        }
    });

})();