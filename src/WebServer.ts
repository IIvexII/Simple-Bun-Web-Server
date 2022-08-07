import { callbackify } from "util";

// Basic web server with routes based on Bun.
type CallBack = () => Response;

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
    private routes: RouteInterface = {'GET': [], 'POST': []};
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
    public triggerRoute(method: string, url:string):Response {
        // Extracting route from url
        let route = url.replace(this.baseUrl, '');
        route = '/' + route;

        console.log(route);
        if (method in this.routes)
        {
            this.routes[method].forEach((value) => {
                if (value.route == route){
                    return value.callback();
                }
            });
        } else {
            return new Response('404');
        }
    }
    // push route in our routes object.
    private pushIntoRoutes(method: string, route:string, callback: CallBack):void {
        if (method in this.routes){
            this.routes[method].push({route,callback});
        }
    }
}
 export const server = (port:number, configRoutes:ConfigRoutes) => {
     Bun.serve({
         fetch(req: Request) {
            // log message of serving at url.
            console.log(`Serving at: ${this.hostname}`)

            // Setting up the base url for Config class.
            configRoutes.setUrl(this.hostname);

            // Trigger the route
            return configRoutes.triggerRoute(req.method, req.url);
        },
        port:port
    });
}