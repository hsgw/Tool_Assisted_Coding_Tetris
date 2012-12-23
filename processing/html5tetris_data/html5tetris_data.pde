byte[] file;
PrintWriter output;

String fileName = "tetris.js";

void setup(){
  int deleteNum = 0;
  file = loadBytes(fileName);
  output = createWriter(fileName+".txt");
  for(int i=0;i<file.length;i++){
    if((char)file[i]=='\t'){
      //tab
      output.print("179, ");
    }else if((char)file[i]=='\r'){
      //return
      output.print("176, ");
    }else if((char)file[i]=='\n'){
      deleteNum--;
    }else if((char)file[i]=='\''){
      //return
      output.print(" 39, ");
    }else if((char)file[i]=='\"'){
      //return
      output.print(" 34, ");
    }else{
      output.print("'"+(char)file[i]+"', ");
    }
    
    if((i+deleteNum)%1000==999){
      output.println();
      output.println();
    }
    
  }
  output.println("");
  output.println("");
  output.println(file.length+deleteNum);
  
  output.flush(); // Write the remaining data
  output.close(); // Finish the file
  println("done!");
  exit(); // Stop the program
}
