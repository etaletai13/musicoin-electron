import test from 'ava';
import {Application} from 'spectron';
 
test.beforeEach(t => {
  t.context.app = new Application({
    path: '/Applications/MyApp.app/Contents/MacOS/MyApp'
  });
 
  return t.context.app.start();
});
 
test.afterEach(t => {
  return t.context.app.stop();
});
 
test(t => {
  return t.context.app.client.waitUntilWindowLoaded()
    .getWindowCount().then(count => {
      t.is(count, 1);
    }).browserWindow.isMinimized().then(min => {
      t.false(min);
    }).browserWindow.isDevToolsOpened().then(opened => {
      t.false(opened);
    }).browserWindow.isVisible().then(visible => {
      t.true(visible);
    }).browserWindow.isFocused().then(focused => {
      t.true(focused);
    }).browserWindow.getBounds().then(bounds => {
      t.true(bounds.width > 0);
      t.true(bounds.height > 0);
    });
});

initialiseSpectron() {
   let electronPath = path.join(__dirname, "../node_modules", ".bin", "electron");
   const appPath = path.join(__dirname, "../dist");
   if (process.platform === "win32") {
       electronPath += ".cmd";
   }
 
   return new Application({
       path: electronPath,
       args: [appPath],
       env: {
           ELECTRON_ENABLE_LOGGING: true,
           ELECTRON_ENABLE_STACK_DUMPING: true,
           NODE_ENV: "development"
       },
       startTimeout: 20000,
       chromeDriverLogPath: 'log/chromedriver.log'
  });
}
