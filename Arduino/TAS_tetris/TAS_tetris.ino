/************************************************************
 * Tool Assisted Speed Coding and Speed Run
 *   -HTML5 Tetris-
 * (c) 2012,hsgw http://dm9records.com
 * 
 * Arduino Leonardo or compatible board.
 * !!!!!!!!!!Only for WINDOWS!!!!!!!!!!!
 * (But it may be easy for transplanting to other OS)
 * Required Bounce http://playground.arduino.cc//Code/Bounce
 ************************************************************/

#include <avr/pgmspace.h>
#include <Bounce.h>
#include "data.h"

Bounce sw1 = Bounce(2,5);

void setup(){
  pinMode(13,OUTPUT);
  pinMode(2,INPUT_PULLUP);
  Keyboard.begin();
}

void loop(){
  sw1.update();

  bool sw1State = sw1.fallingEdge();

  if(sw1State){
    //make dir
    //digitalWrite(13,HIGH);
    Keyboard.println("mkdir tetris");
    Keyboard.println("cd tetris");
    //coding
    coding("xors.js",xors,xorsLength);
    coding("draw.js",draw,drawLength);
    coding("blocks.js",blocks,blocksLength);
    coding("tetris.js",tetris,tetrisLength);
    coding("tetris.html",html,htmlLength);
    
    //open tetris.html
    Keyboard.println("tetris.html");
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
        Keyboard.write((char)pgm_read_byte(tas+i));
      }
      delay(20);
    }
    //digitalWrite(13,LOW);
  }
}

void coding(String fileName, const prog_char *data[], int dataLength){
  int dataArrayLength = dataLength / 1000;
  int loopLength = 0;

  //make fileName.txt
  Keyboard.println("type nul > " + fileName + ".txt");
  delay(100);
  //open file
  Keyboard.println(fileName + ".txt");
  delay(1000);
  //inside file
  for(int j=0;j <= dataArrayLength;j++){
    loopLength = dataLength - 1000 * j;
    if(loopLength > 1000) loopLength = 1000;
    for(int i=0;i < loopLength;i++){
      Keyboard.write((char)pgm_read_byte((data[j])+i));
      delay(5);
    }
  }
  delay(100);
  //save and close file
  Keyboard.press(KEY_LEFT_CTRL);
  Keyboard.press('e');
  delay(100);
  Keyboard.releaseAll();
  delay(1000);
  //rename
  Keyboard.println("rename " + fileName + ".txt " + fileName);
  delay(500);
}


