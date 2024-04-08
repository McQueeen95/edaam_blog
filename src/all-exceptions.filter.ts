import { Catch, ArgumentsHost, HttpStatus, HttpException  } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { Request, Response } from "express";
import { MyLoggerService } from "./my-logger/my-logger.service";
import { PrismaClientInitializationError, PrismaClientKnownRequestError, PrismaClientRustPanicError, PrismaClientUnknownRequestError, PrismaClientValidationError } from "@prisma/client/runtime/library";

type MyResponseObj = {
  statusCode: number,
  timestamp: string,
  error: string,
  path: string,
  message: string | object
}


@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  private readonly logger = new MyLoggerService(AllExceptionsFilter.name);

  catch(exception: any, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const myResponseObj: MyResponseObj = {
      statusCode: 500,
      timestamp: new Date().toISOString(),
      error: exception.name,
      path: request.url,
      message: ''
    }
    // (https://www.prisma.io/docs/orm/reference/error-reference#prismaclientinitializationerror) here all the Prisma Client error types and the cause for every error type
    if(exception instanceof HttpException){
      myResponseObj.statusCode = exception.getStatus();
      myResponseObj.message = exception.getResponse();
    }else if (exception instanceof PrismaClientValidationError) {
      myResponseObj.statusCode = 422;
      myResponseObj.message = exception.message.replaceAll(/\n/g, '');
    }else if(exception instanceof PrismaClientKnownRequestError){
      myResponseObj.statusCode = 400;
      myResponseObj.message = exception.message.replaceAll(/\n/g, '');
    }else if(exception instanceof PrismaClientUnknownRequestError){
      myResponseObj.statusCode = 400;
      myResponseObj.message = exception.message.replaceAll(/\n/g, '');
    }else if(exception instanceof PrismaClientRustPanicError){
      myResponseObj.statusCode = 500;
      myResponseObj.message = exception.message.replaceAll(/\n/g, '');
    }else if(exception instanceof PrismaClientInitializationError){
      myResponseObj.statusCode = 500;
      myResponseObj.message = exception.message.replaceAll(/\n/g, '');
    }else{
      myResponseObj.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      myResponseObj.message = 'Internal server error';
    }
    response.status(myResponseObj.statusCode).json(myResponseObj);
    this.logger.error(myResponseObj.message, AllExceptionsFilter.name);

    super.catch(exception, host);
  }
}