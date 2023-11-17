const ORIGIN = window.location.origin;
      
export function eventedPushState(state, title, url) {
   const pushChangeEvent = new CustomEvent('onpushstate', {
      detail: {
         state,
         title,
         url,
      },
           
   });
   document.dispatchEvent(pushChangeEvent);
   return history.pushState(state, title, [ORIGIN, url].join('/'));
};