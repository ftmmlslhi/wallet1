import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../roles/role.enum';
import { ROLES_KEY } from '../roles/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {  

    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
    ]);
    
    const req = context.switchToHttp().getRequest();
    const userRole = req.body.Payload.role;
    
    if (!userRole || !requiredRoles.includes(userRole)) {
      throw new UnauthorizedException('You do not have permission to access this resource');
    }

    return true;
  }
}
