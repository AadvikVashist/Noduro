# Noduro

Noduro is an electron-based cross-platform app that utilizes HTML, CSS, Javascript, and Python to provide Daily Living Skill (DLS) instruction to children and young adults with disabilities. The installation process for developers is simple and straightforward. Here's  the process:

## Clone the Repostiory

Clone the repository and open the destination folder. The terminal directory should be set to __~/Noduro__.

To clone a repository, get on [GitHub](github.com), navigate to the main page of the repository.

1. Above the list of files, click  Code.
2. Copy the URL for the repository.

    * To clone the repository using HTTPS, under "HTTPS", click  "__*.*__"
    * To clone the repository using an SSH key, including a certificate issued by your organization's SSH certificate authority, click SSH, then click .
    * To clone a repository using GitHub CLI, click GitHub CLI, then click .

4. Open the terminal if you haven't already
5. Change the current working directory to the location where you want the cloned directory.
6. git clone the url ```bash https://github.com THE_REPOSITORY```
7. Press Enter to create your local clone.

## Install Python

Check if you have python installed. If you don't know how to do so, look below.

##### Windows

Open command prompt and type:

```bash
python
```

To download python, do any of these:

* Windows Store
* [Python.org](https://www.python.org/downloads/) (recommended)
* Windows Subsystem for Linux [(WSL)](https://docs.microsoft.com/en-us/windows/wsl/install-win10).  

##### Linux

Open the terminal and type:

```bash

python3 --version
```

To download python, do any of these:

* [Python.org](https://www.python.org/downloads/) (recommended)

##### Mac

Open the terminal and type:

```bash

python3 --version
```

To download python, do any of these:

* [Python.org](https://www.python.org/downloads/) (recommended)
* [Hombrew](https://brew.sh/) install

## Node.js

To use Noduro (and specifically Electron), you need to install [__*Node.js*__](https://nodejs.org/en/download). We recommend that you use the latest LTS version available. To check that [__*Node.js*__](https://nodejs.org/en/download) was installed correctly, type the following commands in your terminal client:

```bash
node -v

npm -v
```

## Initialize npm

The commands should print the versions of Node.js and npm accordingly.

```bash
npm init
npm install --save-dev electron
npm start
```

## Initialize virtual environment (venv)

The commands should print the versions of Node.js and npm accordingly.
Create a Virtual Environment: Start by creating a virtual environment specifically for your project. This allows you to have an isolated Python environment for your code. Open a terminal or command prompt in the root directory of your project and execute the following command:

```bash
python -m venv noduro_python
```

This command creates a new virtual environment named "noduro_python"

#### Activate the Virtual Environment

Activate the virtual environment to ensure that all subsequent Python commands and installations are performed within the isolated environment. Execute the appropriate command based on your operating system:

##### For Windows:

```bash
.\noduro_python\Scripts\activate
```

##### For macOS/Linux:

```bash
source noduro_python/bin/activate
```

#### Install Dependencies

Install the required Python packages and libraries for your project. Execute the necessary pip install commands to install the packages you need. For example:

```bash
pip install -r requirements.txt
```

## Usage

Run using the vscode debugger. You can run either the ```main``` or the ```renderer``` processes. When an Electron application is launched, the ```main``` process is created. We can only have one ```main``` process per application. This process can talk to native system APIs and start  ```renderer``` processes. A  ```renderer``` process is responsible to display UI using HTML, CSS, and JavaScript. The ```main``` process is like the browser, and the  ```renderer``` process is the tabs. [For more information](https://medium.com/jspoint/a-beginners-guide-to-creating-desktop-applications-using-electron-824da5665047)

## Contributing

To contribute, just clone the repostiory, and push any neccessary changes. Make a pull request to the master branch once you are done, and someone will review and approve them.
<!-- 
## License

[MIT](https://choosealicense.com/licenses/mit/) -->