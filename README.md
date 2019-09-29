# JavaScript Multi-Threading Demo
Demonstrates the using of HTML5 [Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers), new coming Node.js [worker_threads](https://nodejs.org/api/worker_threads.html) module and the parallel computing in single-threaded JavaScript at all. Presents a set of demo-solutions and should be considered solely as a testing stuff.

### Before start
It uses the worker_threads module, so you should have [Node.js](https://nodejs.org) v10.5.0 or latest. 

After cloning the repository install dependencies using npm:
```shell
npm i
```

And build using npm script:
```shell
npm run build
```

### Instruction
It contains of two applications:
- [app](/app) - the main application suggests you to try different solutions of the parallel computing in JavaScript;
- [monitor](/monitor) - displays CPU usage and logs from the main app's client and server.

How does it work? Better to get a look at the diagram:
![block-diagram](/resources/block-diagram.png)

To start both servers use:
```shell
npm run start
```

It runs the **app** on 3000 ([localhost:3000](http://localhost:3000)) and the **monitor** on 3001 ([localhost:3001](http://localhost:3001)) in background.

To see the servers' logs turn to *logs/app-output.log* and *logs/monitor-output.log* respectively.

To stop both servers use:
```shell
npm run stop
```

If you have any problems on start/stop check [that section](#problems).

Want to know more before playing? Here are some screens:
- [home page](/resources/screen-home.png) - the list of solutions;
- [client computing](/resources/screen-compute-client.png) - demo for computing on the client-side;
- [server computing](/resources/screen-compute-server.png) - demo for computing on the server-side;
- [monitor](/resources/screen-monitor.png) - the monitor's page.

The images may vary over time.

### Problems
At the moment the management npm scripts are available and have been tested only on linux/macos platforms. If you are trying to manage on a windows platform or have any other problem you can start the monitor manually:
```shell
node --experimental-worker monitor/server.js
```

and the app in the same way:
```shell
node --experimental-worker app/server.js
```

There is already an [issue](https://github.com/cerberus-ab/js-multi-threading-demo/issues/4) about the problem, don't worry.