export class User {
  firstName!: string;
  lastName!: string;
  birthDate!: number;
  street!: string;
  zipCode!: number;
  city!: string;
  email!: string;
  department!: string;

  constructor(obj?: any) {
    if (obj) {
      this.firstName = obj?.firstName || '';
      this.lastName = obj?.lastName || '';
      this.birthDate = obj?.birthDate || 0;
      this.street = obj?.street || '';
      this.zipCode = obj?.zipCode || 0;
      this.city = obj?.city || '';
      this.email = obj?.email || '';
      this.department = obj?.department || '';
    }
  }

  toJSON() {
    return {
      firstName: this.firstName || '',
      lastName: this.lastName || '',
      birthDate: this.birthDate || 0,
      street: this.street || '',
      zipCode: this.zipCode || 0,
      city: this.city || '',
      email: this.email || '',
      department: this.department || '',
    };
  }
}
