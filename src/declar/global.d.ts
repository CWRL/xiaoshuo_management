export {}
import {mit} from '../main'
declare module '@vue/runtime-core'{
    export interface ComponentCustomProperties{
        $socket:any,
        $onevent:any,
        $removeevent:any,
        $bus:typeof mit
    }
}