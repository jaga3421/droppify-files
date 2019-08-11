# droppify-files

A micro utility file to convert an empty div into an drag and drop file uploader
Here is a[ demo](https://jaga3421.github.io/droppify-files/)

### How to use in application
1. Add the minified script file in your application

```<script src="https://jaga3421.github.io/droppify-files/dist/droppify.js"></script>```

2. Add a markup in your HTML/template file

```<div class="dnd"></div>```

3. Initialize the util with this code

```DNDfy.init()```
	
### Options

Initialization of the util can be done with custom options (default values are shown)

```
DNDfy.init({
	selector = '.dnd',
	promptText = 'Click or Drop your Files here', 
	activeClass = 'dragActive', 
	acceptedFiles = ['mp3','mp4','jpg'] 
});
```
### For Developers
Bundling is done using parcel. Feel free to fork this Repository and contribute.

To Run the repo on local server.

```
git clone https://github.com/jaga3421/droppify-files.git
npm install
parcel index.html
```

To build the files

```
parcel build src/droppify.js
```
