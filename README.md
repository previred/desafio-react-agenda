## Previred Frontend Test - Agenda de contactos Yosmar Hinestroza

### Indicaciones

La aplicacion esta desarrollada en REACTJS V18.2.0, y se esta usando las la diferente bibiotecas como se describen a continuación.

Esta app esta desarrollada para prueba tecnica para el puesto de Ingeniero Frontend Previred


### Descripción e instalación


```
npm install
npm start
```

El servidor se levanta en el puerto [localhost:9000](http://localhost:3000). esto depende igual del puerto disponible

### Herramientas usadadas


| Librería |Descripción |                                                                                                                                                                   
| ----------- | :------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|  "standard": "^17.1.0" | Herramienta que permite ejecutar formateo del proyecto esto igual depende de la libreria eslint |
|  "sweetalert2": "^11.10.5" | Herramienta que permite mostrar notificaciones |
|  "antd" | Comó diseño de componentes|

                                                                                 |
Para que funcione el tema del formateo se debe de configurar lo siguiente

En el Archivo package.json, agregar la siguiente linea en 
```
 "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest",
      "./node_modules/standard/eslintrc.json"
    ]
  },
```

Archivo setting.json agregar la siguiente linea

```
 "editor.codeActionsOnSave": {
    
    "source.fixAll.eslint": "explicit"
  },
```

Cualquier duda comunicarse con Yosmar Hinestroza [yosmarhinestroza.dev](http://yosmarhinestroza.dev)
