# JavaScript Multi-Threading Demo
Demonstrates the using of HTML5 [Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers), new coming Node.js [worker_threads](https://nodejs.org/api/worker_threads.html) module and the parallel computing in single-threaded JavaScript at all. Presents a set of demo-solutions and should be considered solely as a testing stuff.

### Before start
It uses the worker_threads module, so you should have [Node.js](https://nodejs.org) v10.5.0 or higher. 

After cloning the repository install dependencies using npm:
```shell
npm i
```

and build using npm script:
```shell
npm run build
```

### Instruction
It consists of two applications:
- [app](/app) - the main application suggests you to try different solutions of the parallel computing in JavaScript;
- [monitor](/monitor) - displays CPU usage and logs from the main app's client and server.

Here you can see the UI of both applications (the images may vary):

![ui-screens](/resources/ui-screens.png)

To start both servers use:
```shell
npm run start
```

It runs the **app** on 3000 ([localhost:3000](http://localhost:3000)) and the **monitor** on 3001 ([localhost:3001](http://localhost:3001)) in background.

To stop both servers use:
```shell
npm run stop
```

To see the servers' logs turn to *logs/app-output.log* and *logs/monitor-output.log* respectively.

If you have any problems on start/stop check [that section](#problems).

### How it works
Better to get a look at the diagram:

![block-diagram](/resources/block-diagram.png)

### Settings
The [settings.json](/app/settings.json) file contains a list of default options for all solutions. It may be extended for each solution by *options* in the [solutions.json](/app/solutions.json) file. The list of options:

- `{number}` **DATA_SEED**: 500 - Determines the size of the computed CPU-intensive task.
- `{number}` **DATA_BATCH_SIZE**: 100 - The part of the computed task on batching.
- `{number}` **WAIT_BEFORE_COMPUTE**: 3000 (ms) - Wait before the computing after start demo (client-side demo).
- `{number}` **TIMER_TICK**: 200 (ms) - The time before the next timer's tick (client-side demo).
- `{number}` **WORKERS_COUNT**: 4 - The number of workers used. If there's a master-worker involved the actual number will be more by one.
- `{number}` **REQUESTS_COUNT**: 3 - The number of requests sent for computing (server-side demo).
- `{number}` **REQUESTS_DELAY**: 1000 (ms) - Wait before the next request (server-side demo).

Any changes need the app's restart.

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