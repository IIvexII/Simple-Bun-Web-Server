import { callbackify } from "util";

// Basic web server with routes based on Bun.
type CallBack = () => string;

interface RouteInterface {
    [method:string]: 
        [
            info?:{
            route:string,
            callback:CallBack
            }
        ];
}
export class ConfigRoutes {
    // All registered routes will be stored here.
    public routes: RouteInterface = {'GET': [], 'POST': []};
    private baseUrl: string;

    setUrl(url:string){
        this.baseUrl = url;
    }
    public get(route: string, callback:CallBack):void {
        this.pushIntoRoutes('GET', route, callback);
        
    }
    public post(route:string, callback:CallBack):void {
        this.pushIntoRoutes('POST', route, callback);
    }

    // Trigger call back on route given
    public triggerRoute(method: string, url:string):string {
        // Extracting route from url
        let route = url.replace(this.baseUrl, '');
        route = '/' + route;
        
        if (method in this.routes)
        {
            for(let value of this.routes[method])
            {
                if (value.route == route){
                    return value.callback();
                }
            };
        } else {
            return '404';
        }
    }
    // push route in our routes object.
    private pushIntoRoutes(method: string, route:string, callback: CallBack):void {
        if (method in this.routes){
            this.routes[method].push({route,callback});
        }
    }
}
 export function server (port:number, configRoutes:ConfigRoutes) {
     console.log(`Serving on: http://localhost:${port}`)
     Bun.serve({
         fetch(req: Request) {
            // Setting up the base url for Config class.
            configRoutes.setUrl(this.hostname);
             const message = configRoutes.triggerRoute(req.method, req.url);

            // Trigger the route
            return new Response(message);
        },
        port:port
    });
}