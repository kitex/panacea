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


export interface SecurityScan {
  id: string;
  number_of_compliance_plugins:string;
  number_of_compliance_plugins_failed:string;
  number_of_compliance_plugins_passed:string;
  number_of_compliance_plugins_warning:string;
  scan_end_time:string;
  scan_ip:string;
  scan_report_name:string;
  scan_start_time:string;
  scan_time_elapsed:string;
  scanresult_id:string;
}

export interface ComplianceEvidence {
  compliance_check_name:string;
  evidence_file_name: string;
  evidence_image_name: string;
  evidence_remarks: string;
  host_resolved_ip: string;
  scan_report_name: string;
  sn: number;
}

export class SecurityEvidence {
  compliance_check_actual_value: string;
  compliance_check_info: string;
  compliance_check_name: string;
  compliance_check_result: string;
  compliance_check_solution: string;
  host_resolved_ip: string;
  scan_report_name: string;
  scanresult_id: string;
  remarks: string;
  sn: string;

  constructor(compliance_check_actual_value: string,compliance_check_info: string,compliance_check_name: string,compliance_check_result: string,compliance_check_solution:string,
    host_resolved_ip:string,scan_report_name:string,scanresult_id:string,remarks:string,sn:string) {
    this.compliance_check_actual_value = compliance_check_actual_value;
    this.compliance_check_info = compliance_check_info;
    this.compliance_check_name = compliance_check_name;
    this.compliance_check_result = compliance_check_result;
    this.compliance_check_solution = compliance_check_solution;
    this.host_resolved_ip = host_resolved_ip;
    this.scan_report_name = scan_report_name;
    this.scanresult_id = scanresult_id;
    this.remarks = remarks;
    this.sn = sn
  }
  
}

export interface msg_response{
  message: boolean;
}
