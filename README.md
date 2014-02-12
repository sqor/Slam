# Darkside
A very simple widget based framework with example live feed implementations.

### Dependencies:
- node  @v0.10.25
- npm   @1.3.24
- jquery  @v1.10.2
- underscore.js - @1.5.2
- underscorePlus - useful extension to underscore
- jshint - a simple linter @v2.4.3
- JSDoc documentation  @3.3.0-alpha4 (Sun, 26 Jan 2014 04:51:18 GMT)


#### Soft Dependencies:
- testosterone.js
- plato
- socrates

sudo apt-get install notify-tools
inotifywait

### Building
``` ./build ```


## Key Features
- Data driven
- fast loading
- mobile support

## Overview

Modules and widgets using a style similar to OSX with delegates. 



## Key Compoenents:

### Sqor.Core
Our core libraries include things like models and  collections.

### Sqor.Services
Some key services include our Messenger service which is a wrapper
to contact our rest endpoints.


### Sqor.Widgets
Very simple reusable UI classes that implement things like:
 - simple tables
 - dyanamic tables
 - simple grids

### Sqor.Modules
Modules for the most part are at a level above Widgets, and should leverage
widgets when possible. They are a bit more aware of data and some even their
"sorroundings". They can be used to do things like render a specific part
of a site. One example is a nav bar, a side bar, etc.



### Sqor bootstrap
A simple set of classes to get the library loaded. It initializes all the 
holding objects for a lot of the above.



## Install

npm install -g jsdoc
npm install -g plato

