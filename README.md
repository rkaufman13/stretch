# Local Dev

Run `npm install` from the base of the repository, then `npm start`, which has been modified to start the firebase emulator suite. If you have any issues run `firebase emulators:start` & `npm run start-without-db` simultaenously but separtely (read: in two different terminals).

### If the emulator suite is not installed on your local machine:

Please install the emulator suite following the instructions:

- `npm install -g firebase-tools`
- `firebase login`
- `firebase init emulators`
  - Choose the Auth emulator specifically. It should already be initialzed if you run the previous command from the base of the repo. It will be indicated by a full green circle next to the list item.

Once the app is running on `localhost:3000`, you should be able to trigger a login by clicking the button and creating any user in the resulting popup.

#### Additional Issues:

If firebase cli is installed but java is not (or not exported in the $PATH) you may get the following error: `Could not spawn java -version. Please make sure Java is installed and on exported on your system PATH` 

If you're using ubuntu linux run `sudo apt install default-jdk` and it will handle everything.

## TODOS

everything