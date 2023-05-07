import { PaginationRequestI } from "src/shared/pagination/pagination.interface";
import { ResponseServiceI } from "../../helpers/responses/interface/response.interface";
import { ResponseService } from "../../helpers/responses/response.service";
import { DepartmentRepository } from "./repository/departments.repository";
import { DepartmentI } from "./types/departments.types";

export class DepartmentService {
  contructor() { }
  private readonly departmentRepository: DepartmentRepository =
    new DepartmentRepository();

  async store(payload: DepartmentI): Promise<ResponseServiceI> {
    const data = await this.departmentRepository.postDepartment(payload);
    return ResponseService(true, "Department created", data, 200);
  }

  async find(
    pagination: PaginationRequestI,
    clientId: number
  ): Promise<ResponseServiceI> {
    const data = await this.departmentRepository.getDepartments(pagination, clientId);
    return ResponseService(true, "Departments found", data, 200);
  }

  async findById(id: number): Promise<ResponseServiceI> {
    const data = await this.departmentRepository.findById(id);
    return ResponseService(true, "Department found", data, 200);
  }

  async update(id: number, payload: DepartmentI): Promise<ResponseServiceI> {
    const data = await this.departmentRepository.updateById(id, payload);
    return ResponseService(true, "Department updated", data, 200);
  }

  async delete(id: number): Promise<ResponseServiceI> {
    const data = await this.departmentRepository.deleteById(id);
    return ResponseService(true, "Department and positions deleted", data, 200);
  }
}
