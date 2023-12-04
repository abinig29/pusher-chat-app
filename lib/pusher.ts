import Pusher from "pusher-js";
const pusher = new Pusher(process.env.NEXT_PUBLIC_KEY as string, {
    cluster:"ap2" ,
});
export default pusher