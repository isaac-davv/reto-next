export type FormState = {
  status: number;
  errors: {
    name?: string[];
    duration?: string[];
    description?: string[];
    general?: string[];
  };
};
