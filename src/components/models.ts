export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export interface Task {
  name: number;
  dueDate: Date;
  dueTime: string;
}

export interface SecurityEvidence {
  compliance_check_actual_value: string;
  compliance_check_info: string;
  compliance_check_name: string;
  compliance_check_result: string;
  compliance_check_solution: string;
  host_resolved_ip: string;
  scan_report_name: string;
  scanresult_id: number;
  remarks: string;
}
