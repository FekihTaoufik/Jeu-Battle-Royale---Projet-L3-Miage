import _ from 'lodash'
import weapon_states from './weapons.json'
const base_url = '/assets/img/game/'

function animation_load(scene) {
    scene.load.image(`rip`, `rip.png`)
    weapon_states.forEach(wp => {
        wp.states.forEach(s => {
            for (let i = s.start; i <= s.end; i++)
                scene.load.image(`player_${wp.label}_${s.label}_${i}`, `${wp.label}/${s.label}/survivor-${s.label}_${wp.label}_${i}.png`)
        })
    });
    return
}

function animation_create(scene) {
    weapon_states.forEach(wp => {
        wp.states.forEach(s => {
            var config = {
                key: `player_${wp.label}_${s.label}`,
                frames: [],
                frameRate: typeof s.frameRate!='undefined'?s.frameRate:25,
                repeat: typeof s.repeat !='undefined'?s.repeat:-1
            };
            for (let i = s.start; i <= s.end; i++){
                config.frames.push({ key: `player_${wp.label}_${s.label}_${i}`})
            }
            scene.anims.create(config)
        })
    })
    return
}
export {
    animation_load,
    animation_create
}