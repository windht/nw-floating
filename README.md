# nw-floating
A node-webkit integration with AngularJS to make dropbox like floating windows.

# Features
Dropbox dropping down menus!

# Dependencies
In order to use it elegantly, I integrated angularjs for a cool use of directive, other than this, nothing more is needed in your NW application. 

Everything is in html!

# Usage

## Injection

        angular.module('yourApp',[windht.node-webkit.float-window]);

Then simply use the directives in your html and declare the width and height of your window in any of the Angular run methods.



There are four directives now. (2015-04-17):

## float-container

        <float-container background="white">
        </float-container>
        
This is the basic container for the whole window, but be sure to use js method to define the width and height instead of css to this directive.

## float-header,float-footer

        <float-header background="white" height="35">
        </float-header> 
        
        <float-footer background="white" height="35">
        </float-footer> 
        
This two directives has same api-attr, one of them stick to the top of float-container, one of the is at the bottom.

## float-content

        <float-content height="500">
        </float-content> 
        
This is where the main body is! Put in anything you think that is cool!

## Update

This repo will be updated in the period of one month with stable fixes and more function releases. Feel free to change the way the code behaves!

