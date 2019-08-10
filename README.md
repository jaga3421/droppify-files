# droppify-files
A micro utility file to convert an empty div into an drag and drop file uploader

# How to use
1. Add the script file in your application
2. Add a markup in your HTML/template file
<div class="dnd"></div>
3. Initiate the util
DNDfy.init()

# options
You can also initiate the util with custom options (default values are shown)
DNDfy.init({
  selector = '.dnd',
  promptText = 'Click or Drop your Files here',
  activeClass = 'dragActive',
  acceptedFiles = ['mp3','mp4','jpg']
})
