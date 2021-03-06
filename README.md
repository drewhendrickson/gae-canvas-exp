A demo experiment to show off how to use HTML canvas and Google App Engine for psychology experiments
==================

### Required tools:

- Python 2.7
- Google App Engine Launcher for Python: [here](https://developers.google.com/appengine/downloads#Google_App_Engine_SDK_for_Python)
- Google App command line tools (for downloading data from server). This must be done when starting Google AppEngineLauncher

### How to run locally for testing (in Chrome):

1. Open Google AppEngineLauncher
2. File -> Add Existing Application
3. Navigate to this folder
4. Click Add
5. Click Run in AppEngineLauncher
6. Navigate in browser to localhost:8080
7. Generate some data
7. To inspect the data you created, in the App Engine Launcher click on SDK Console and then on Datastore Viewer

### How to upload this experiment to your own Google App Engine account:

1. Log into Google App Engine at https://appengine.google.com/
2. Click on the Create Application button
3. Pick an Application Identifier and a title, then press Create Application
4. Edit the file app.yaml so that your Application Identifier is on the first line (exactly as you created it)
5. Open this project in Google App Engine Launcher on your local machine
6. Click the Deploy button and enter your password

### Files in this project and what they do:

- index.html: actual html of the experiment that is loaded
- js/exp.js: javascript file loaded by index.html (except for JQuery)
- app.yaml: (often need to change the first two lines)
  - defines app name and version number (along with what version of python to use)
- backend.py: tells the server how to process requests (should be left alone)
- backend.pyc: is automatically generated by python based on backend.py
- bulkloader.yaml: (should be left alone)
  - tells the data downloader how the data from Google will be formatted
  - must match backend.py
- analysis/parser.py: parses raw GAE result (it assumes a tab-delimited file) into CSV file suitable for further processing
- analysis/read.R: basic R file that calles parser.py and reads the data into an R data.frame

### How to upload a new version of your experiment

1. change whatever you needed to change in the experiment
2. Edit app.yaml to have a new version number (usually by adding one)
3. In Google App Engine, click Deploy
4. open the appengine.google.com webpage for your experiment and click Dashboard
5. On the dashboard, click Versions (under Main in the
 left bar)
6. Set your new version as Default

Note: If you upload a new version of your experiment, it will still share the same datastore as your previous experiments. To remove the existing data in the datastore, either create a new experiment (with a different application identifier) or delete all data in the datastore.

### How to check on the data once deployed to the web

1. Open the dashboard for your experiment (via Google App Engine)
2. Click Datastore Viewer (under Data in the left bar)
3. Enjoy

### How to download data from the GAE webpage:

enter this at the command line:

```
appcfg.py download_data --config_file=bulkloader.yaml --filename=data.csv --kind=DataObject --url=http://<app_name>.appspot.com/_ah/remote_api
```

Note: The local testing in Google App Engine currently doesn't support batch download

