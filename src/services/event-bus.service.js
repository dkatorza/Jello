function on(eventName, listener) {

    const callListener = ({ detail }) => {
        listener(detail);
    };

    window.addEventListener(eventName, callListener);

    return () => {
        window.removeEventListener(eventName, callListener);
    };
}

function emit(eventName, data) {
    window.dispatchEvent(new CustomEvent(eventName, { detail: data }));
}

export const eventBusService = { on, emit };

export function showUserMsg(txt, type = '') {
    eventBusService.emit('show-user-msg', { txt, type })
}
export function showSuccessMsg(txt) {
    showUserMsg(txt, 'success')
}
export function showErrorMsg(txt) {
    showUserMsg(txt, 'danger')
}

window.myBus = eventBusService;
window.showUserMsg = showUserMsg;

// eventBusService.on('baba', (x)=>console.log('Hi Baba', x))
// eventBusService.on('baba', (x)=>console.log('Hello Baba Ji', x))
// eventBusService.emit('baba', [5, 8, 11])
// setTimeout(()=>{
//     eventBusService.emit('baba', 17)
// }, 2000)

/* Listening Component...
    import {eventBusService} from 'path...event-bus-service'
    eventBusService.on('some-event', (dataFromEvent) => {
    do something with dataFromEvent
    })

   Receiving Component...
    eventBusService.emit('some-event', data)
*/