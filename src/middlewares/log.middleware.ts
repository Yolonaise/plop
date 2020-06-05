import { Middleware, MiddlewareTarget, Context } from "../../deps.ts";

@Middleware(new RegExp("/"))
export class LogMiddleware implements MiddlewareTarget<unknown> {
  onPreRequest(context: Context<unknown>): void {
    const { url, method } = context.request.serverRequest;
    console.log(`Plopping ${method}:${url}`);
  }
  onPostRequest(context: Context<unknown>): void {
    // nothing to log
  }
}
