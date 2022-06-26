import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ContextService } from "../services/context.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private context: ContextService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        const authToken = this.context.getAuthToken();
        if (authToken) {
            request = request.clone({
                setHeaders: {
                    Authorization: authToken
                }
            });
        }

        return next.handle(request);
    }
}