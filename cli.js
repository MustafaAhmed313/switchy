const dotenv = require("dotenv");
const { FileOperator } = require("./utils/fileOperator");
dotenv.config({ path: '.env' });

// const test = async () => {
//   try {
//     const response = await FileOperator.writeJsonFile(['mostafa', 'software engineer kd el doina']); // No need to stringify here; writeJsonFile will handle it
//     console.log("Response from write to JSON file:", response);
//   } catch (error) {
//     console.error("An error occurred while writing to the JSON file:", error); // Handle any errors that occur
//   }
// };

// test();

// const test = async ()=>{
  
  
  
  //   const data  = await FileOperator.readJsonFile()
  
  //   if(response){
    //     console.log(data)
    //   }
    // } 


// (async () => {
//   try {
//       const response = await FileOperator.writeJsonFile(JSON.stringify({key: 'value'}));
//       console.log('Data written successfully');
      
//       // If you want to write to the file as well
//       const data = await FileOperator.readJsonFile();
//       console.log('Data read:', data);
//   } catch (error) {
//       console.error('Caught an error:', error); // Handle errors gracefully
//   }
// })();



const { exec } = require('child_process');

exec('./scripts/check_git.sh', (error, stdout, stderr) => {
    if (error) {
        console.error(`Error executing script: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`Script error: ${stderr}`);
        return;
    }
    
    // Process the output from the script
    const result = stdout.trim(); // Remove any trailing newlines or spaces
    console.log(`Does .git directory exist? ${result}`);
});
