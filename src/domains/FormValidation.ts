interface FormValidation {
  validate(): Promise<{ valid: boolean }>;
}

export default FormValidation;
