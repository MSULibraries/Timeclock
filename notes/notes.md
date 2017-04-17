4/12/2017:

Each Container has the Actions for the redux store. This is to allow for the nested components 
  to have access to the actions when commands (actions) need to be dispatched.
  
The Global reducer lives within the App folder and within the reducer folder which allows for the 
  reducer to have access to the app on a global level
  
Selector file lives within the App folder, which allows for global sync among all the states.