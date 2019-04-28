/************************************************************
 * Tool Assisted Speed Coding and Speed Run
 *   -HTML5 Tetris-
 * (c) 2012, 2019, hsgw http://dm9records.com
 * 
 * Arduino Leonardo or compatible board.
 * !!!!!!!!!!Only for LINUX!!!!!!!!!!!
 * (But it may be easy for transplanting to other OS)
 * Required Bounce http://playground.arduino.cc//Code/Bounce
 ************************************************************/

#include <Keyboard_jp.h>
#include <Bounce2.h>

#include "data.h"

#define RXLED 17

Bounce sw1 = Bounce(10, 5);

void setup(){
  pinMode(RXLED,OUTPUT);
  digitalWrite(RXLED, 0);
  TXLED0;
  pinMode(10,INPUT_PULLUP);
  Keyboard.begin();
}

void loop(){
  sw1.update();

  bool sw1State = sw1.fallingEdge();

  if(sw1State){
    //make dir
    digitalWrite(RXLED,HIGH);
    Keyboard.print("rm -r tetris\n");
    Keyboard.print("mkdir tetris\n");
    //coding
    coding("xors.js",xors,xorsLength);
    coding("draw.js",draw,drawLength);
    coding("blocks.js",blocks,blocksLength);
    coding("tetris.js",tetris,tetrisLength);
    coding("tetris.html",html,htmlLength);
    
    //open tetris.html
    Keyboard.print("xdg-open tetris/tetris.html\n");
    //digitalWrite(13,LOW);
    delay(3500);
    
    //TAS
    //digitalWrite(13,HIGH);
    Keyboard.write(' ');
    Keyboard.write(' ');
    
    for(int i=0;i<tasLength;i++){
      if((char)pgm_read_byte(tas+i)==0){
        delay(700);
      }else{
        Keyboard.writeRaw((char)pgm_read_byte(tas+i));
      }
      delay(20);
    }
    digitalWrite(RXLED,LOW);
  }
}

void coding(String fileName, const char *data[], int dataLength){
  int dataArrayLength = dataLength / 1000;
  int loopLength = 0;

  //make fileName.txt
  Keyboard.print("vim tetris/" + fileName + "\n");
  delay(300);
  //inside file
  Keyboard.print("i");
  delay(300);
  for(int j=0;j <= dataArrayLength;j++){
    loopLength = dataLength - 1000 * j;
    if(loopLength > 1000) loopLength = 1000;
    for(int i=0;i < loopLength;i++){
      Keyboard.write((char)pgm_read_byte((data[j])+i));
      delay(3);
    }
  }
  delay(100);
  //save and close file
  Keyboard.write(KEY_ESC);
  delay(10);
  Keyboard.print(":wq\n");
  delay(500);
}
