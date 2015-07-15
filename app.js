var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//vamos a instalar el middleware para nuestra vista comun layout
var partials = require('express-partials');
var methodOverride = require('method-override');
var session = require('express-session');

var routes = require('./routes/index');
//var users = require('./routes/users'); SE BORRO POR QUE NO LO VAMOS A HACER ASI

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//vamos a usar ese partials
app.use(partials());

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser('Qu1z_Luisb0204'));
app.use(session());//usamos session, instalar MV session
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

/*Middleware que mata la sesion luego de 2 minutos de inactividad*/
//mata cualquier peticion aunque no requiera login
app.use(function(req, res, next){
    var expira = 120000;//2 minutos 120000 milisegundos
    var now = new Date().getTime();//captura tiempo actual en milisegundos
    
    //parametros de sesion y parametro de ultima transaccion (Si existen)
    if(req.session && req.session.lastAccess) {
    var lifetime = now - req.session.lastAccess;//tiempo de vida actual transaccion - ultima
        if (lifetime >= expira){//si el tiempo de vida es mayor que tantos segundos para expirar
            delete req.session.user;//borramos sesion
        }
    }
    req.session.lastAccess = now;//ultimo acceso esta nueva transaccion
    next();
});
/*------------------------------------------------------------------*/

//HELPERS DINAMICOS
app.use(function(req, res, next){
  //guardar path de url en session.redir para cuando haga login (carga con autenticado)
  if (!req.path.match(/\/login|\/logout/)) {
    req.session.redir = req.path;
  }

  //hacer visible req.session en las vistas
  res.locals.session = req.session;
  next();
});

app.use('/', routes);
//app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
      errors: []
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
    errors: []
  });
});


module.exports = app;
