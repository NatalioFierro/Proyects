var app = angular.module("app", []);
app.controller("control", function($scope, $http, $filter) {
    $scope.btnImprimir = "Registrar";
    $scope.btnCargar = "Cargar";
    $scope.btnCarrito = "AgregarCarrito";
    $scope.btnProvedor = "cProvedor";
    $scope.cantidadV = 0;
    $scope.p = "";
    $scope.fechae = Date.now().toString();/*fecha de hoy*/
    $scope.elegido = "";
    $scope.Dia = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"];
    $scope.Mes = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Ocubre","Noviembre","Diciembre"];
    $scope.Ano = ["2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026", "2027", "2028", "2029",
                "2030", "2031", "2032", "2033", "2034", "2035", "2036", "2037", "2038", "2039",
                "2040", "2041", "2042", "2043", "2044", "2045", "2046", "2047", "2048", "2049",
                "2050", "2051", "2052", "2053", "2054", "2055", "2056", "2057", "2058", "2059",
                "2060", "2061", "2062", "2063", "2064", "2065", "2066", "2067", "2068", "2069"
                , "2070", "2071", "2072", "2073", "2074", "2075", "2076", "2077", "2078", "2079"
                , "2080", "2081", "2082", "2083", "2084", "2085", "2086", "2087", "2088", "2089"
                , "2090", "2091", "2092", "2093", "2094", "2095", "2096", "2097", "2098", "2099"
                , "2100", "2101", "2102", "2103", "2104", "2105", "2106", "2107", "2108", "2109"
                , "2110", "2111", "2112", "2113", "2114", "2115", "2116", "2117", "2118", "2119"];
    $scope.importe;
    $scope.idfactura = "";
    $scope.idproducto = "";
    $scope.subtotalV = 0;
    $scope.esc = "esconder";
    $scope.totalV = 0;
    $scope.buss = "";
    $scope.btnVender = "Vender";
    $scope.cuanto = "";
/*$scope.recargar = function(){
    $interval(function()
    {$scope.show_data();$scope.mostrarProdu();},100);}
*/

  

    $scope.imprimir = function(){
        $scope.fechar = Date.now().toString();
    }

    $scope.igualar = function(){
        $scope.cerrar = $scope.abrir;
    }
    
    

    $scope.insertFactura = function() {   
        if($scope.cliente === undefined){
            alert("Debe completar el campo 'Cliente' antes de añadir una nueva factura.");
        }
       else if($scope.dni === undefined){
            alert("Debe completar el campo 'Dni' antes de añadir una nueva factura.");
        }
       else if($scope.dispositivo === undefined){
            alert("Debe completar el campo 'Dispositivo a Reparar' anes de añadir una nueva factura.")
        }else{
            $http.post(
                "db/insertFactura.php", {
                    'id': $scope.idfactura,                    
                    'cliente': $scope.cliente,
                    'dni' : $scope.dni,
                    'domicilio': $scope.domicilio,
                    'telefono': $scope.telefono,
                    'dispositivo': $scope.dispositivo,
                    'servicio': $scope.servicio,
                    'fechae': $scope.fechae,
                    'fechar': $scope.fechar,
                    'importe': $scope.importe,
                    'repuestos': $scope.repuestos,                    
                    'btnName': $scope.btnImprimir,                   
                }
                
            ).success(function(data){
                if(data !== null) alert("Agregado Exitosamente...");                  
               $scope.btnImprimir = "Registrar";
               $scope.mostrar();
            });
        }
    }

    $scope.insertProducto = function() {  
        if($scope.nombre === undefined){
            alert("Debe completar el campo 'Nombre'.");
        } else if($scope.preventa === undefined){
            alert("Debe completar el campo 'Precio de venta'.");
        }else if($scope.proveedor === undefined){
            alert("Debe completar el campo 'proveedor'.")
        }else{
        $http.post(
            "db/insertProducto.php", {
                'id': $scope.idproducto,                    
                'nombre': $scope.nombre,
                'codigo': $scope.codigo,
                'categoria': $scope.categoria,
                'descripcion': $scope.descripcion,
                'tamano': $scope.tamano,
                'costoDolar': $scope.costoDolar,
                'precosto': $scope.precosto,
                'preventa': $scope.preventa,
                'proveedor': $scope.proveedor,
                'cantidad': $scope.cantidad,                    
                'btnName': $scope.btnCargar,                   
            }
            
        ).success(function(data){
            alert(data);  
            $scope.idproducto = undefined;             
            $scope.idFactura = undefined;         
            $scope.nombre = undefined;
            $scope.codigo = undefined;
            $scope.categoria = undefined;
            $scope.descripcion = undefined;
            $scope.tamano = undefined;
            $scope.costoDolar = undefined;
            $scope.precosto = undefined;
            $scope.preventa = undefined;
            $scope.proveedor = undefined;
            $scope.cantidad = undefined;                        
            $scope.btnCargar = "Cargar";
            $scope.mostrarProdu();
        });
    }
    }
    
    $scope.insertProvedor = function(id, nombre, codigo, proveedor,precosto) {  
        $scope.Procantidad =  prompt("¿Que cantidad desea Pedir?"); 
        var t = Number($scope.Procantidad) * Number(precosto);
        if(confirm("El siguiente pedido tiene un costo de: $"+ t )){

                
        $http.post(
            "db/insertProvedor.php", {
                'id':   id,                    
                'nombre': nombre,
                'codigo': codigo,
                'proveedor': proveedor,
                'cantidad': $scope.Procantidad,
                'precosto': t,                    
                'btnName': $scope.btnProvedor,                   
            }
            
        ).success(function(data){
            alert(data);  
            $scope.idproducto = null;             
            $scope.idFactura = null;         
            $scope.nombre = null;
            $scope.codigo = null;
            $scope.proveedor = null;
            $scope.cantidad = null;                        
            $scope.btnProvedor = "cProvedor";
            $scope.mostarProvedor();
            
        });
    }

    }

    $scope.mostarProvedor = function(){
        var pro = [];
        $http.get("db/displayProvedor.php")
        .success(function(data){
            $scope.listaProvedor = data;
            angular.forEach(data, function(value){
                pro.push(value.proveedor);
            });

        },pro);
        $scope.pro = angular.bind(this, pro);
    }
          
    $scope.mostrar = function() { 
        $http.get("db/displayfac.php")
            .success(function(data){                                
                $scope.factura = data;
                $scope.factura.reverse();
                $scope.max = $scope.factura.length;           
        });
    }

    
    $scope.MuestraNuevo = function(aumento){
    var pequeño = [];
    aumento = Number(aumento);
    var i = 0;   
        angular.forEach($scope.factura, function(value){
            if(i <= aumento && i<= $scope.max){
                pequeño.push(value);
                i++;
                console.log(aumento + ' i ' + i);
            }else{
                console.log("hasta aca llegaste");
            }
        },pequeño);
        $scope.peque = angular.bind(this, pequeño);
    }

    $scope.Todo = function(){
        $scope.peque = $scope.factura;
    }

    $scope.mostrarProdu = function() { 
        $http.get("db/displayStock.php")
            .success(function(data){                                
                $scope.producto = data;   
                         
        });            
    }

    $scope.mostrarVentas = function(){
        $http.get("db/displayVentas.php")
        .success(function(data){
            $scope.Ventas = data;
            
        });
        
    }


    $scope.updateFactura = function(idfactura, cliente, dni, domicilio, telefono, dispositivo, servicio, fechae, fechar, importe, repuestos) {        
            $scope.idfactura = idfactura;         
            $scope.cliente = cliente;
            $scope.dni = dni;
            $scope.domicilio = domicilio;
            $scope.telefono = telefono; 
            $scope.dispositivo = dispositivo;
            $scope.servicio = servicio;
            $scope.fechae = fechae;
            $scope.fechar = fechar;
            $scope.importe = importe;
            $scope.repuestos = repuestos;                        
            $scope.btnImprimir = "Cambiar";
            $scope.mostrar();
    }

    $scope.updateProducto = function(idproducto, nombre, codigo, categoria, descripcion, tamano, costoDolar, precosto, preventa, proveedor, cantidad) {        
        $scope.idproducto = idproducto;         
        $scope.nombre = nombre;
        $scope.codigo = codigo;
        $scope.categoria = categoria; 
        $scope.descripcion = descripcion;
        $scope.tamano = tamano;
        $scope.costoDolar = costoDolar;
        $scope.precosto = precosto;
        $scope.preventa = preventa;
        $scope.proveedor = proveedor;
        $scope.cantidad = cantidad;                        
        $scope.btnCargar = "Modificar";
        $scope.mostrarProdu();
        
} 
    //Borrar servicio
    $scope.deleteFactura = function(id) {
        if (confirm("Esta seguro de que quiere borrarlo?")) {
            $http.post("db/deleteFactura.php", {
                    'id': id
                })
                .success(function(data) {
                    alert(data);
                    $scope.mostrar();
                });
        } else {
            return false;
        }
    }

    $scope.deleteProvedor = function(id){
        if (confirm("Esta seguro de que quiere borrarlo?")) {
            $http.post("db/borrarProvedor.php", {
                    'id': id
                })
                .success(function(data) {
                    alert(data);
                    $scope.mostarProvedor();
                });
        } else {
            return false;
        }
    }

    $scope.deleteCarrito = function(codigo){
        $http.post("db/borrarCarrito.php",{
            'codigo':codigo
        }).success(function(){
            $scope.mostrarCarro();
            $scope.mostrarTotal();
        });
    }
    $scope.borrarVenta = function(id, codigo, cantidad){
        if (confirm("Esta seguro de que quiere borrarlo?")) {
            $http.post("db/deleteVenta.php", {
                    'id': id,
                    'cantidad': cantidad,
                    'codigo' : codigo,
                })
                .success(function(data) {
                    alert(data);
                    $scope.mostrarVentas();
                    $scope.mostrarProdu();
                });
        } else {
            return false;
        }
    }

    $scope.deleteProducto = function(id) {
        if (confirm("Esta seguro de que quiere borrarlo?")) {
            $http.post("db/deleteProducto.php", {
                    'id': id
                })
                .success(function(data) {
                    alert(data);
                    $scope.mostrarProdu();
                });
        } else {
            return false;
        }
    }

    $scope.nuevo = function(){
        $scope.idfactura = undefined;         
        $scope.cliente = undefined;
        $scope.dni = undefined;
        $scope.domicilio = undefined;
        $scope.telefono = undefined;
        $scope.dispositivo = undefined;
        $scope.servicio = undefined;
        $scope.repuestos = undefined;
        $scope.importe = undefined;
        $scope.fechar = undefined;
        $scope.btnImprimir = "Registrar";
    }

    $scope.nuevoProducto = function(){
        $scope.idproducto = undefined;             
        $scope.idFactura = undefined;         
        $scope.nombre = undefined;
        $scope.codigo = undefined;
        $scope.categoria = undefined;
        $scope.descripcion = undefined;
        $scope.tamano = undefined;
        $scope.costoDolar = undefined;
        $scope.precosto = undefined;
        $scope.preventa = undefined;
        $scope.proveedor = undefined;
        $scope.cantidad = undefined;
        $scope.btnCargar = "Cargar";
    }
    
    $scope.Carrito = function(codigo, nombre, preventa, precosto){       /* pega de la lista en los input */
        $http.get("db/displayStock.php")
        .success(function(data){
            angular.forEach(data, function(value){
                if(value.codigo === codigo){
                if(Number(value.cantidad) > 0){
                    if(Number(value.cantidad) <= 8){
                        $scope.codigoV = codigo;
                        $scope.nombreV = nombre;
                        $scope.precioV = preventa;
                        $scope.cantidadV = 1;
                        $scope.mostrarProdu();
                        $scope.subtotalV = ($scope.precioV * $scope.cantidadV);
                        $scope.prec = precosto;
                        alert("¡Atencion! Quedan solo " + Number(value.cantidad) +" '"+value.nombre+"'");
                    }else{
                        $scope.codigoV = codigo;
                        $scope.nombreV = nombre;
                        $scope.precioV = preventa;
                        $scope.cantidadV = 1;
                        $scope.mostrarProdu();
                        $scope.subtotalV = ($scope.precioV * $scope.cantidadV);
                        $scope.prec = precosto;
                    }
                    
                }else{
                    alert("¡El Producto: " + value.nombre + " se ha agotado!");
                }
            }
            });
        });
        
    }

    $scope.totalVenta = function(){        
        $scope.subtotalV = ($scope.precioV * $scope.cantidadV);
        
    }
    $scope.totalVentaR = function(){        
       return $scope.subtotalV = ($scope.precioV * $scope.cantidadV);
    }
    /*que vender agrege los input a la base de datos y de ahi mostrarlos en el carrito desde la db  */
    
    $scope.mostrarCarro = function(){
    $http.get("db/displayCarro.php")
    .success(function(data){                                
        $scope.Carro = data;                      
    });
    $scope.mostrarTotal();
   }

   $scope.mostrarTotal = function(){
       $http.get("db/displayTotal.php")
       .success(function(data){
        $scope.totalV = data;
       });
   }
   
  /* $scope.totalVentaa = function(){
       $scope.totalVenta = 0;
       $http.get("displayVentas.php")
       .success(function(data){
        angular.forEach(data, function(value){
            $scope.totalVenta = $scope.totalVenta + Number(value.total);
        });
       });
   }*/

   
   
   $scope.restarCantidad = function(codigo, cantidad){
       $http.post(
           "db/restarCantidad.php",{
               'codigo' : codigo,
               'cantidad': cantidad,
               'btnName' : $scope.btnCarrito,
           }
       ).success(function(){
         /*alert(data);*/
         $scope.mostrarProdu();
       });
   }

    $scope.Vender = function(){
        $scope.control = 1;
        
        $scope.pref = $scope.prec * $scope.cantidadV;
        if($scope.codigoV !== undefined){

        angular.forEach($scope.Carro, function(value){
            if(value.codigo === $scope.codigoV){
               
            $http.post(
                    "db/carrito.php", { 
                        'codigo': $scope.codigoV,
                        'cantidad': $scope.cantidadV,
                        'subtotal': $scope.subtotalV,
                        'precosto': $scope.pref,
                        'btnName': "Modi",                  
                    }
                ).success(function(){
                    $scope.mostrarCarro();
                    $scope.mostrarTotal();
                    $scope.codigoV = null;
                    $scope.nombreV = null;
                    $scope.cantidadV = null;
                    $scope.precioV = null;
                    $scope.pref = null;
                    $scope.prec = null;
                    $scope.subtotalV = null;  
                });
                $scope.control = 0;
            }
        });
            if($scope.control === 1){
                $http.post(
                    "db/carrito.php", {
                        'nombre': $scope.nombreV,                  
                        'codigo': $scope.codigoV,
                        'cantidad': $scope.cantidadV,
                        'subtotal': $scope.subtotalV,
                        'precosto' : $scope.pref,
                        'btnName': $scope.btnCarrito,                  
                    }
                ).success(function(){
                    $scope.mostrarCarro();
                    $scope.mostrarTotal();
                    $scope.codigoV = null;
                    $scope.nombreV = null;
                    $scope.cantidadV = null;
                    $scope.precioV = null;
                    $scope.pref = null;
                    $scope.prec = null;
                    $scope.subtotalV = null;  
                    $scope.control = 1;
                    $http.get("db/displayStock.php")
                    .success(function(dataP){
                    $scope.p = dataP;
                    });
                    $http.get("db/displayCarro.php")
                    .success(function(dataC){
                        $scope.c = dataC;
                    });
                });
            }
        }else{
            alert("No hay ningun producto para agregar al Carro de ventas. Seleccione un producto desde el Stock para luego añadirlo.");
        }                           
    }
    
   
    $scope.GenerarVenta = function(){
        
         if($scope.Carrito === undefined){  
                    alert("El Carro de ventas esta vacio. Agrege algun producto para poder venderlo.");
                }else{
            angular.forEach($scope.c, function(value) {
                    
                    angular.forEach($scope.p, function(cod){
                            
                            if(value.codigo === cod.codigo){
                                
                                $scope.restarCantidad(value.codigo, value.cantidad);  /*Resta la cantidad vendida desde el stock */
                            }
                    });
                    
                    var d = $filter('date')($scope.fechae, 'd'); 
                    var a = $filter('date')($scope.fechae, 'M');
                    var b = $filter('date')($scope.fechae, 'y');
                    $http.post( /*Inserta en Venta 1 x 1 */
                        "db/insertarVenta.php",
                        {
                            'nombre': value.nombre,
                            'codigo': value.codigo,
                            'fecha': $scope.fechae,
                            'cantidad': value.cantidad,
                            'total': value.subtotal,
                            'mes' : a,
                            'ano': b,
                            'dia' : d,
                            'precosto': value.precosto,
                            'btnName': "Vender",
                        }
                    ).success(function(){
                        $scope.deleteCarrito(value.codigo);
                        $scope.CajaVenta();
                        $scope.mostrarVentas();
                        $scope.p = null;
                        $scope.c = null;
                    });
            
            });
            
        }
       
        
    }

    $scope.totalProvedor = function(){
        $scope.totalProve = 0;
        $http.get("db/displayProvedor.php")
        .success(function(data){
            angular.forEach(data, function(value){
                if($scope.Prov !== undefined){
                    if($scope.Prov === value.proveedor){
                    $scope.totalProve = $scope.totalProve + Number(value.precosto);
                    }
                }else if($scope.Prov === undefined){
                    $scope.totalProve = $scope.totalProve + Number(value.precosto);
                }
            });
        });
    }

    $scope.buscarFecha = function(){
        $scope.totalMes = 0;
        $scope.ganancia = 0;
        $scope.cantVendida = 0;
        var cont = 0;
        var fecha = [];
        switch($scope.elegido){
            case "Enero":
            $http.get("db/displayVentas.php")
            .success(function(data){
                if($scope.elegidoD === undefined){
                angular.forEach(data, function(value){
                    if(value.mes === "1" && value.ano === $scope.elegidoA){
                        if($scope.buss === ""){
                            $scope.totalMes = $scope.totalMes + Number(value.total);
                            cont = cont + Number(value.precosto);
                            $scope.ganancia = $scope.totalMes - cont;
                            $scope.cantVendida = $scope.cantVendida + Number(value.cantidad);
                            fecha.push(value);
                            
                        }if($scope.buss !== "" && $scope.buss === value.nombre || $scope.buss === value.codigo){
                            $scope.totalMes = $scope.totalMes + Number(value.total) ;
                            cont = cont + Number(value.precosto);
                            $scope.ganancia = $scope.totalMes - cont;
                            $scope.cantVendida = $scope.cantVendida + Number(value.cantidad);
                            fecha.push(value);
                            
                        }
                       
                    }
                },fecha);
                
            }else{
                angular.forEach(data, function(value){
                    if(value.mes === "1" && value.ano === $scope.elegidoA && value.dia === $scope.elegidoD){
                        if($scope.buss === ""){
                            $scope.totalMes = $scope.totalMes + Number(value.total) ;
                            cont = cont + Number(value.precosto);
                            $scope.ganancia = $scope.totalMes - cont;
                            $scope.cantVendida = $scope.cantVendida + Number(value.cantidad);
                            fecha.push(value);
                            
                        }if($scope.buss !== "" && $scope.buss === value.nombre || $scope.buss === value.codigo){
                            $scope.totalMes = $scope.totalMes + Number(value.total) ;
                            cont = cont + Number(value.precosto);
                            $scope.ganancia = $scope.totalMes - cont;
                            $scope.cantVendida = $scope.cantVendida + Number(value.cantidad);
                            fecha.push(value);
                            
                        }
                       
                    }
                },fecha);
                $scope.elegidoD = undefined;
            }
                $scope.Ventas = angular.bind(this, fecha);
                
            });break;
            case "Febrero":
            $http.get("db/displayVentas.php")
            .success(function(data){
                if($scope.elegidoD === undefined){
                angular.forEach(data, function(value){
                    if(value.mes === "2" && value.ano === $scope.elegidoA){
                        if($scope.buss === ""){
                            $scope.totalMes = $scope.totalMes + Number(value.total) ;
                            cont = cont + Number(value.precosto);
                            $scope.ganancia = $scope.totalMes - cont;
                            $scope.cantVendida = $scope.cantVendida + Number(value.cantidad);
                            fecha.push(value);
                            
                        }if($scope.buss !== "" && $scope.buss === value.nombre || $scope.buss === value.codigo){
                            $scope.totalMes = $scope.totalMes + Number(value.total) ;
                            cont = cont + Number(value.precosto);
                            $scope.ganancia = $scope.totalMes - cont;
                            $scope.cantVendida = $scope.cantVendida + Number(value.cantidad);
                            fecha.push(value);
                            
                        }
                       
                    }
                },fecha);
                
            }else{
                angular.forEach(data, function(value){
                    if(value.mes === "2" && value.ano === $scope.elegidoA && value.dia === $scope.elegidoD){
                        if($scope.buss === ""){
                            $scope.totalMes = $scope.totalMes + Number(value.total) ;
                            cont = cont + Number(value.precosto);
                            $scope.ganancia = $scope.totalMes - cont;
                            $scope.cantVendida = $scope.cantVendida + Number(value.cantidad);
                            fecha.push(value);
                            
                        }if($scope.buss !== "" && $scope.buss === value.nombre || $scope.buss === value.codigo){
                            $scope.totalMes = $scope.totalMes + Number(value.total) ;
                            cont = cont + Number(value.precosto);
                            $scope.ganancia = $scope.totalMes - cont;
                            $scope.cantVendida = $scope.cantVendida + Number(value.cantidad);
                            fecha.push(value);
                            
                        }
                       
                    }
                },fecha);
                $scope.elegidoD = undefined;
            }
                $scope.Ventas = angular.bind(this, fecha);
                
            });break;
            case "Marzo":
            $http.get("db/displayVentas.php")
            .success(function(data){
                if($scope.elegidoD === undefined){
                angular.forEach(data, function(value){
                    if(value.mes === "3" && value.ano === $scope.elegidoA){
                        if($scope.buss === ""){
                            $scope.totalMes = $scope.totalMes + Number(value.total) ;
                            fecha.push(value);
                            cont = cont + Number(value.precosto);
                            $scope.ganancia = $scope.totalMes - cont;
                            $scope.cantVendida = $scope.cantVendida + Number(value.cantidad);
                            
                        }if($scope.buss !== "" && $scope.buss === value.nombre || $scope.buss === value.codigo){
                            $scope.totalMes = $scope.totalMes + Number(value.total) ;
                            fecha.push(value);
                            cont = cont + Number(value.precosto);
                            $scope.ganancia = $scope.totalMes - cont;
                            $scope.cantVendida = $scope.cantVendida + Number(value.cantidad);
                            
                        }
                       
                    }
                },fecha);
                
            }else{
                angular.forEach(data, function(value){
                    if(value.mes === "3" && value.ano === $scope.elegidoA && value.dia === $scope.elegidoD){
                        if($scope.buss === ""){
                            $scope.totalMes = $scope.totalMes + Number(value.total) ;
                            fecha.push(value);
                            cont = cont + Number(value.precosto);
                            $scope.ganancia = $scope.totalMes - cont;
                            $scope.cantVendida = $scope.cantVendida + Number(value.cantidad);
                            
                        }if($scope.buss !== "" && $scope.buss === value.nombre || $scope.buss === value.codigo){
                            $scope.totalMes = $scope.totalMes + Number(value.total) ;
                            fecha.push(value);
                            cont = cont + Number(value.precosto);
                            $scope.ganancia = $scope.totalMes - cont;
                            $scope.cantVendida = $scope.cantVendida + Number(value.cantidad);
                            
                        }
                       
                    }
                },fecha);
                $scope.elegidoD = undefined;
            }
                $scope.Ventas = angular.bind(this, fecha);
                
            });break;
            case "Abril":
            $http.get("db/displayVentas.php")
            .success(function(data){
                if($scope.elegidoD === undefined){
                angular.forEach(data, function(value){
                    if(value.mes === "4" && value.ano === $scope.elegidoA){
                        if($scope.buss === ""){
                            $scope.totalMes = $scope.totalMes + Number(value.total) ;
                            fecha.push(value);
                            cont = cont + Number(value.precosto);
                            $scope.ganancia = $scope.totalMes - cont;
                            $scope.cantVendida = $scope.cantVendida + Number(value.cantidad);
                            
                        }if($scope.buss !== "" && $scope.buss === value.nombre || $scope.buss === value.codigo){
                            $scope.totalMes = $scope.totalMes + Number(value.total) ;
                            fecha.push(value);
                            cont = cont + Number(value.precosto);
                            $scope.ganancia = $scope.totalMes - cont;
                            $scope.cantVendida = $scope.cantVendida + Number(value.cantidad);
                            
                        }
                       
                    }
                },fecha);
                
            }else{
                angular.forEach(data, function(value){
                    if(value.mes === "4" && value.ano === $scope.elegidoA && value.dia === $scope.elegidoD){
                        if($scope.buss === ""){
                            $scope.totalMes = $scope.totalMes + Number(value.total) ;
                            fecha.push(value);
                            cont = cont + Number(value.precosto);
                            $scope.ganancia = $scope.totalMes - cont;
                            $scope.cantVendida = $scope.cantVendida + Number(value.cantidad);
                            
                        }if($scope.buss !== "" && $scope.buss === value.nombre || $scope.buss === value.codigo){
                            $scope.totalMes = $scope.totalMes + Number(value.total) ;
                            fecha.push(value);
                            cont = cont + Number(value.precosto);
                            $scope.ganancia = $scope.totalMes - cont;
                            $scope.cantVendida = $scope.cantVendida + Number(value.cantidad);
                            
                        }
                       
                    }
                },fecha);
                $scope.elegidoD = undefined;
            }
                $scope.Ventas = angular.bind(this, fecha);
                
            });break;
            case "Mayo":
                    $http.get("db/displayVentas.php")
                    .success(function(data){
                        if($scope.elegidoD === undefined){
                        angular.forEach(data, function(value){
                            if(value.mes === "5" && value.ano === $scope.elegidoA){
                                if($scope.buss === ""){
                                    $scope.totalMes = $scope.totalMes + Number(value.total) ;
                                    cont = cont + Number(value.precosto);
                                    $scope.ganancia = $scope.totalMes - cont;
                                    $scope.cantVendida = $scope.cantVendida + Number(value.cantidad);
                                    fecha.push(value);
                                    
                                }if($scope.buss !== "" && $scope.buss === value.nombre || $scope.buss === value.codigo){
                                    $scope.totalMes = $scope.totalMes + Number(value.total) ;
                                    cont = cont + Number(value.precosto);
                                    $scope.ganancia = $scope.totalMes - cont;
                                    $scope.cantVendida = $scope.cantVendida + Number(value.cantidad);
                                    fecha.push(value);
                                    
                                }
                               
                            }
                        },fecha);
                        
                    }else{
                        angular.forEach(data, function(value){
                            if(value.mes === "5" && value.ano === $scope.elegidoA && value.dia === $scope.elegidoD){
                                if($scope.buss === ""){
                                    $scope.totalMes = $scope.totalMes + Number(value.total) ;
                                    cont = cont + Number(value.precosto);
                                    $scope.ganancia = $scope.totalMes - cont;
                                    $scope.cantVendida = $scope.cantVendida + Number(value.cantidad);
                                    fecha.push(value);
                                    
                                }if($scope.buss !== "" && $scope.buss === value.nombre || $scope.buss === value.codigo){
                                    $scope.totalMes = $scope.totalMes + Number(value.total) ;
                                    cont = cont + Number(value.precosto);
                                    $scope.ganancia = $scope.totalMes - cont;
                                    $scope.cantVendida = $scope.cantVendida + Number(value.cantidad);
                                    fecha.push(value);
                                    
                                }
                               
                            }
                        },fecha);
                        $scope.elegidoD = undefined;
                    }
                        $scope.Ventas = angular.bind(this, fecha);
                        
                    });break;
            case "Junio":
            $http.get("db/displayVentas.php")
            .success(function(data){
                if($scope.elegidoD === undefined){
                angular.forEach(data, function(value){
                    if(value.mes === "6" && value.ano === $scope.elegidoA){
                        if($scope.buss === ""){
                            $scope.totalMes = $scope.totalMes + Number(value.total) ;
                            fecha.push(value);
                            cont = cont + Number(value.precosto);
                            $scope.ganancia = $scope.totalMes - cont;
                            $scope.cantVendida = $scope.cantVendida + Number(value.cantidad);
                            
                        }if($scope.buss !== "" && $scope.buss === value.nombre || $scope.buss === value.codigo){
                            $scope.totalMes = $scope.totalMes + Number(value.total) ;
                            fecha.push(value);
                            cont = cont + Number(value.precosto);
                            $scope.ganancia = $scope.totalMes - cont;
                            $scope.cantVendida = $scope.cantVendida + Number(value.cantidad);
                            
                        }
                       
                    }
                },fecha);
                
            }else{
                angular.forEach(data, function(value){
                    if(value.mes === "6" && value.ano === $scope.elegidoA && value.dia === $scope.elegidoD){
                        if($scope.buss === ""){
                            $scope.totalMes = $scope.totalMes + Number(value.total) ;
                            fecha.push(value);
                            cont = cont + Number(value.precosto);
                            $scope.ganancia = $scope.totalMes - cont;
                            $scope.cantVendida = $scope.cantVendida + Number(value.cantidad);
                            
                        }if($scope.buss !== "" && $scope.buss === value.nombre || $scope.buss === value.codigo){
                            $scope.totalMes = $scope.totalMes + Number(value.total) ;
                            fecha.push(value);
                            cont = cont + Number(value.precosto);
                            $scope.ganancia = $scope.totalMes - cont;
                            $scope.cantVendida = $scope.cantVendida + Number(value.cantidad);
                            
                        }
                       
                    }
                },fecha);
                $scope.elegidoD = undefined;
            }
                $scope.Ventas = angular.bind(this, fecha);
                
            });break;
            case "Julio":
            $http.get("db/displayVentas.php")
            .success(function(data){
                if($scope.elegidoD === undefined){
                angular.forEach(data, function(value){
                    if(value.mes === "7" && value.ano === $scope.elegidoA){
                        if($scope.buss === ""){
                            $scope.totalMes = $scope.totalMes + Number(value.total) ;
                            fecha.push(value);
                            cont = cont + Number(value.precosto);
                            $scope.ganancia = $scope.totalMes - cont;
                            $scope.cantVendida = $scope.cantVendida + Number(value.cantidad);
                            
                        }if($scope.buss !== "" && $scope.buss === value.nombre || $scope.buss === value.codigo){
                            $scope.totalMes = $scope.totalMes + Number(value.total) ;
                            fecha.push(value);
                            cont = cont + Number(value.precosto);
                            $scope.ganancia = $scope.totalMes - cont;
                            $scope.cantVendida = $scope.cantVendida + Number(value.cantidad);
                            
                        }
                       
                    }
                },fecha);
                
            }else{
                angular.forEach(data, function(value){
                    if(value.mes === "7" && value.ano === $scope.elegidoA && value.dia === $scope.elegidoD){
                        if($scope.buss === ""){
                            $scope.totalMes = $scope.totalMes + Number(value.total) ;
                            fecha.push(value);
                            cont = cont + Number(value.precosto);
                            $scope.ganancia = $scope.totalMes - cont;
                            $scope.cantVendida = $scope.cantVendida + Number(value.cantidad);
                            
                        }if($scope.buss !== "" && $scope.buss === value.nombre || $scope.buss === value.codigo){
                            $scope.totalMes = $scope.totalMes + Number(value.total) ;
                            fecha.push(value);
                            cont = cont + Number(value.precosto);
                            $scope.ganancia = $scope.totalMes - cont;
                            $scope.cantVendida = $scope.cantVendida + Number(value.cantidad);
                            
                        }
                       
                    }
                },fecha);
                $scope.elegidoD = undefined;
            }
                $scope.Ventas = angular.bind(this, fecha);
                
            });break;
            case "Agosto":
            $http.get("db/displayVentas.php")
            .success(function(data){
                if($scope.elegidoD === undefined){
                angular.forEach(data, function(value){
                    if(value.mes === "8" && value.ano === $scope.elegidoA){
                        if($scope.buss === ""){
                            $scope.totalMes = $scope.totalMes + Number(value.total) ;
                            fecha.push(value);
                            cont = cont + Number(value.precosto);
                            $scope.ganancia = $scope.totalMes - cont;
                            $scope.cantVendida = $scope.cantVendida + Number(value.cantidad);
                            
                        }if($scope.buss !== "" && $scope.buss === value.nombre || $scope.buss === value.codigo){
                            $scope.totalMes = $scope.totalMes + Number(value.total) ;
                            fecha.push(value);
                            cont = cont + Number(value.precosto);
                            $scope.ganancia = $scope.totalMes - cont;
                            $scope.cantVendida = $scope.cantVendida + Number(value.cantidad);
                            
                        }
                       
                    }
                },fecha);
                
            }else{
                angular.forEach(data, function(value){
                    if(value.mes === "8" && value.ano === $scope.elegidoA && value.dia === $scope.elegidoD){
                        if($scope.buss === ""){
                            $scope.totalMes = $scope.totalMes + Number(value.total) ;
                            fecha.push(value);
                            cont = cont + Number(value.precosto);
                            $scope.ganancia = $scope.totalMes - cont;
                            $scope.cantVendida = $scope.cantVendida + Number(value.cantidad);
                            
                        }if($scope.buss !== "" && $scope.buss === value.nombre || $scope.buss === value.codigo){
                            $scope.totalMes = $scope.totalMes + Number(value.total) ;
                            fecha.push(value);
                            cont = cont + Number(value.precosto);
                            $scope.ganancia = $scope.totalMes - cont;
                            $scope.cantVendida = $scope.cantVendida + Number(value.cantidad);
                            
                        }
                       
                    }
                },fecha);
                $scope.elegidoD = undefined;
            }
                $scope.Ventas = angular.bind(this, fecha);
                
            });break;
            case "Septiembre":
            $http.get("db/displayVentas.php")
            .success(function(data){
                if($scope.elegidoD === undefined){
                angular.forEach(data, function(value){
                    if(value.mes === "9" && value.ano === $scope.elegidoA){
                        if($scope.buss === ""){
                            $scope.totalMes = $scope.totalMes + Number(value.total) ;
                            fecha.push(value);
                            cont = cont + Number(value.precosto);
                            $scope.ganancia = $scope.totalMes - cont;
                            $scope.cantVendida = $scope.cantVendida + Number(value.cantidad);
                            
                        }if($scope.buss !== "" && $scope.buss === value.nombre || $scope.buss === value.codigo){
                            $scope.totalMes = $scope.totalMes + Number(value.total) ;
                            fecha.push(value);
                            cont = cont + Number(value.precosto);
                            $scope.ganancia = $scope.totalMes - cont;
                            $scope.cantVendida = $scope.cantVendida + Number(value.cantidad);
                            
                        }
                       
                    }
                },fecha);
                
            }else{
                angular.forEach(data, function(value){
                    if(value.mes === "9" && value.ano === $scope.elegidoA && value.dia === $scope.elegidoD){
                        if($scope.buss === ""){
                            $scope.totalMes = $scope.totalMes + Number(value.total) ;
                            fecha.push(value);
                            cont = cont + Number(value.precosto);
                            $scope.ganancia = $scope.totalMes - cont;
                            $scope.cantVendida = $scope.cantVendida + Number(value.cantidad);
                            
                        }if($scope.buss !== "" && $scope.buss === value.nombre || $scope.buss === value.codigo){
                            $scope.totalMes = $scope.totalMes + Number(value.total) ;
                            fecha.push(value);
                            cont = cont + Number(value.precosto);
                            $scope.ganancia = $scope.totalMes - cont;
                            $scope.cantVendida = $scope.cantVendida + Number(value.cantidad);
                            
                        }
                       
                    }
                },fecha);
                $scope.elegidoD = undefined;
            }
                $scope.Ventas = angular.bind(this, fecha);
                
            });break;
            case "Octubre":
            $http.get("db/displayVentas.php")
            .success(function(data){
                if($scope.elegidoD === undefined){
                angular.forEach(data, function(value){
                    if(value.mes === "10" && value.ano === $scope.elegidoA){
                        if($scope.buss === ""){
                            $scope.totalMes = $scope.totalMes + Number(value.total) ;
                            fecha.push(value);
                            cont = cont + Number(value.precosto);
                            $scope.ganancia = $scope.totalMes - cont;
                            $scope.cantVendida = $scope.cantVendida + Number(value.cantidad);
                            
                        }if($scope.buss !== "" && $scope.buss === value.nombre || $scope.buss === value.codigo){
                            $scope.totalMes = $scope.totalMes + Number(value.total) ;
                            fecha.push(value);
                            cont = cont + Number(value.precosto);
                            $scope.ganancia = $scope.totalMes - cont;
                            $scope.cantVendida = $scope.cantVendida + Number(value.cantidad);
                            
                        }
                       
                    }
                },fecha);
                
            }else{
                angular.forEach(data, function(value){
                    if(value.mes === "10" && value.ano === $scope.elegidoA && value.dia === $scope.elegidoD){
                        if($scope.buss === ""){
                            $scope.totalMes = $scope.totalMes + Number(value.total) ;
                            fecha.push(value);
                            cont = cont + Number(value.precosto);
                            $scope.ganancia = $scope.totalMes - cont;
                            $scope.cantVendida = $scope.cantVendida + Number(value.cantidad);
                            
                        }if($scope.buss !== "" && $scope.buss === value.nombre || $scope.buss === value.codigo){
                            $scope.totalMes = $scope.totalMes + Number(value.total) ;
                            fecha.push(value);
                            cont = cont + Number(value.precosto);
                            $scope.ganancia = $scope.totalMes - cont;
                            $scope.cantVendida = $scope.cantVendida + Number(value.cantidad);
                            
                        }
                       
                    }
                },fecha);
                $scope.elegidoD = undefined;
            }
                $scope.Ventas = angular.bind(this, fecha);
                
            });break;
            case "Noviembre":
            $http.get("db/displayVentas.php")
            .success(function(data){
                if($scope.elegidoD === undefined){
                angular.forEach(data, function(value){
                    if(value.mes === "11" && value.ano === $scope.elegidoA){
                        if($scope.buss === ""){
                            $scope.totalMes = $scope.totalMes + Number(value.total) ;
                            fecha.push(value);
                            cont = cont + Number(value.precosto);
                            $scope.ganancia = $scope.totalMes - cont;
                            $scope.cantVendida = $scope.cantVendida + Number(value.cantidad);
                            
                        }if($scope.buss !== "" && $scope.buss === value.nombre || $scope.buss === value.codigo){
                            $scope.totalMes = $scope.totalMes + Number(value.total) ;
                            fecha.push(value);
                            cont = cont + Number(value.precosto);
                            $scope.ganancia = $scope.totalMes - cont;
                            $scope.cantVendida = $scope.cantVendida + Number(value.cantidad);
                            
                        }
                       
                    }
                },fecha);
                
            }else{
                angular.forEach(data, function(value){
                    if(value.mes === "11" && value.ano === $scope.elegidoA && value.dia === $scope.elegidoD){
                        if($scope.buss === ""){
                            $scope.totalMes = $scope.totalMes + Number(value.total) ;
                            fecha.push(value);
                            cont = cont + Number(value.precosto);
                            $scope.ganancia = $scope.totalMes - cont;
                            $scope.cantVendida = $scope.cantVendida + Number(value.cantidad);
                            
                        }if($scope.buss !== "" && $scope.buss === value.nombre || $scope.buss === value.codigo){
                            $scope.totalMes = $scope.totalMes + Number(value.total) ;
                            fecha.push(value);
                            cont = cont + Number(value.precosto);
                            $scope.ganancia = $scope.totalMes - cont;
                            $scope.cantVendida = $scope.cantVendida + Number(value.cantidad);
                            
                        }
                       
                    }
                },fecha);
                $scope.elegidoD = undefined;
            }
                $scope.Ventas = angular.bind(this, fecha);
                
            });break;
            case "Diciembre":
            $http.get("db/displayVentas.php")
            .success(function(data){
                if($scope.elegidoD === undefined){
                angular.forEach(data, function(value){
                    if(value.mes === "12" && value.ano === $scope.elegidoA){
                        if($scope.buss === ""){
                            $scope.totalMes = $scope.totalMes + Number(value.total) ;
                            fecha.push(value);
                            cont = cont + Number(value.precosto);
                            $scope.ganancia = $scope.totalMes - cont;
                            $scope.cantVendida = $scope.cantVendida + Number(value.cantidad);
                            
                        }if($scope.buss !== "" && $scope.buss === value.nombre || $scope.buss === value.codigo){
                            $scope.totalMes = $scope.totalMes + Number(value.total) ;
                            fecha.push(value);
                            cont = cont + Number(value.precosto);
                            $scope.ganancia = $scope.totalMes - cont;
                            $scope.cantVendida = $scope.cantVendida + Number(value.cantidad);
                            
                        }
                       
                    }
                },fecha);
                
            }else{
                angular.forEach(data, function(value){
                    if(value.mes === "12" && value.ano === $scope.elegidoA && value.dia === $scope.elegidoD){
                        if($scope.buss === ""){
                            $scope.totalMes = $scope.totalMes + Number(value.total) ;
                            fecha.push(value);
                            cont = cont + Number(value.precosto);
                            $scope.ganancia = $scope.totalMes - cont;
                            $scope.cantVendida = $scope.cantVendida + Number(value.cantidad);
                            
                        }if($scope.buss !== "" && $scope.buss === value.nombre || $scope.buss === value.codigo){
                            $scope.totalMes = $scope.totalMes + Number(value.total) ;
                            fecha.push(value);
                            cont = cont + Number(value.precosto);
                            $scope.ganancia = $scope.totalMes - cont;
                            $scope.cantVendida = $scope.cantVendida + Number(value.cantidad);
                            
                        }
                       
                    }
                },fecha);
                $scope.elegidoD = undefined;
            }
                $scope.Ventas = angular.bind(this, fecha);
                
            });break;
            case null:
                    $scope.mostrarVentas();
                    $http.get("db/displayVentas.php")
                    .success(function(data){
                    angular.forEach(data, function(value){
                        $scope.totalMes = $scope.totalMes + Number(value.total) ;
                    },);
                    
                });
                
                break;
                    
        }
        
    }
   
    $scope.operarCaja = function(){
        angular.forEach($scope.totalV, function(value){
            $scope.cer = Number($scope.cerrar) + Number(value.subtotal);
        });
    }
    
    $scope.gananciaCaja = function(c,a){
        var resta = 0;
        resta = c - a;
        $scope.gananciaCaja = resta;
    }
    
    $scope.idCaja ="";
    $scope.Caja = function(){
        
                
                $http.post(
                    "db/insertCaja.php",
                    {
                        'id': $scope.idCaja,
                        'abrir': $scope.abrir,
                        'cerrar': $scope.cerrar,
                        'fecha': $scope.fechae,
                        'btnName': "Caja",
                    }
                ).success(function(data){
                  alert(data);
                  $scope.mostrarCaja();
                });
              
    }

    $scope.CajaVenta = function(){
        angular.forEach($scope.listaCaja, function(value){
             
            if($filter('date')(value.fecha, 'd') === $filter('date')($scope.fechae, 'd') &&
            $filter('date')(value.fecha, 'M') === $filter('date')($scope.fechae, 'M') &&
            $filter('date')(value.fecha, 'y') === $filter('date')($scope.fechae, 'y') ){
                $scope.operarCaja();
                
            $http.post(
                "db/insertCaja.php",
                {
                    'id': $scope.idCaja,
                    'abrir': $scope.abrir,
                    'cerrar': $scope.cer,
                    'fecha': $scope.fechae,
                    'btnName': "Modi",
                }
            ).success(function(){
                $scope.mostrarCaja();
            });
            }
        });
        
    }
   
    $scope.mostrarCaja = function(){
        
        $http.get("db/displayCaja.php")
            .success(function(data){
               angular.forEach(data, function(value){
                   if($filter('date')(value.fecha, 'd') === $filter('date')($scope.fechae, 'd') &&
                        $filter('date')(value.fecha, 'M') === $filter('date')($scope.fechae, 'M') &&
                        $filter('date')(value.fecha, 'y') === $filter('date')($scope.fechae, 'y') ){
                        $scope.abrir = Number(value.abrir);
                        $scope.cerrar = Number(value.cerrar);
                        $scope.idCaja = Number(value.id);
                        
                   }
                  
               });
               $scope.listaCaja = data;
            });
    }
    
    $scope.cerrarCaja = function(){
        $scope.abrir = null;
        $scope.cerrar = null;
        $scope.idCaja = null;
    }

    $scope.Dolar = function(pre){
        var sum = 0;
        var costoDolar = 0;
        if($scope.dolar){
            costoDolar = pre * $scope.costoDolar;
            $scope.precosto = costoDolar;
            sum = $scope.precosto + ($scope.precosto * 30)/100;         /* % GANANCIA */
            $scope.preventa = sum;
            
        }
        
    }

    $scope.cambiarDolar = function(){
        if(confirm("Se modificara el precio de todos los productos ¿Esta seguro de realizar esta acción?")){
        $http.get("db/displayStock.php")
        .success(function(data){
            angular.forEach(data, function(value){
                var sum = 0;
                var costoDolar = 0;
                costoDolar = $scope.predolar * Number(value.costoDolar);                
                sum = costoDolar + (costoDolar * (10/100));
                $http.post("db/cambiarDolar.php",
                    {
                        'id': Number(value.id),
                        'precosto': costoDolar,
                        'preventa': sum,
                        'btnName': "Modificar",
                    }
                )
                $scope.mostrarProdu();
            });
            alert("¡Se han modificado los precios con exito!");
        });
    }
         
    }


    $scope.log = function(){
        $http.post("db/login.php",
            {
            'user': $scope.user,
            'pass': $scope.pass,
            'btnName': "Log",
            }
        ).success(function(data){
           if(data == "true"){
               $scope.kk = "s";
           }
           else{
               $scope.kk = "n";
               $scope.esc = "mostrar";
           }
        });
    }

    $scope.estado = function(){
        $http.post("db/estado.php")
        .success(function(data){
            
        });
    }

    

    $scope.sortBy = function(propertyName) {
        $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
        $scope.propertyName = propertyName;
      };



    
    
    
});