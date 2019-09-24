# JavaScript Multi-Threading Demo
Demonstrates the using of HTML5 Web Workers, Node.js worker_threads module and parallel computing in JavaScript at all.

### Before start
It uses the [worker_threads](https://nodejs.org/api/worker_threads.html) module, so you should have [node.js](https://nodejs.org) v10.5.0 or latest. 

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
- [app](/app) - the main application suggests you to try different solutions of parallel computing in JavaScript;
- [monitor](/monitor) - displays CPU usage and logs from the main app's client and server.

How does it work? Better to get a look at the diagram:
![block-diagram](/resources/block-diagram.png)

To start both servers use:
```shell
npm run start
```

It runs the **app** on 3000 and the **monitor** on 3001 in background. To see the servers' logs turn to *logs/app-output.log* and *logs/monitor-output.log* respectively.

To stop both servers use:
```shell
npm run stop
```

Want to know more before playing? There are some screens:
- [home page](/resources/screen-home.png) - the list of solutions;
- [client computing](/resources/screen-compute-client.png) - demo for computing on the client-side;
- [server computing](/resources/screen-compute-server.png) - demo for computing on the server-side;
- [monitor](/resources/screen-monitor.png) - the monitor's page.
