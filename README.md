# MERN Stack App

### Getting Started

First thing that you'll need to do is run `npm install` in the root and then `cd client` and then run `npm install` there also.

If you need to close out the server and try to restart it you may run across and error restarting the node server.

If so follow these instructions:

-   In the terminal type `lsof -wni tcp:5000`
-   The response will be something like this:
    `COMMAND PID USER FD TYPE DEVICE SIZE/OFF NODE NAME`
    `node 5623 viet 12u IPv6 59797 0t0 TCP *:3=5000 (LISTEN)`
-   After that type: `kill -9 5623` or whatever the number is after 'node' in the second line
-   Finally, run `npm run dev` and the server will start right up. :)
