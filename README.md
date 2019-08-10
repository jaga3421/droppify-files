# droppify-files

A micro utility file to convert an empty div into an drag and drop file uploader
Here is a[ demo](https://jaga3421.github.io/droppify-files/)

### How to use
1. Add the script file in your application
```<script src="https://jaga3421.github.io/droppify-files/droppify.js"></script>```

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
