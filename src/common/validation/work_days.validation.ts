import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from "class-validator";

@ValidatorConstraint({ name: "IsValidWorkDays", async: false })
export class IsValidWorkDays implements ValidatorConstraintInterface {
  validate(workDays: any, args: ValidationArguments) {
    const daysOfWeek = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];

    if (typeof workDays !== "object" || Array.isArray(workDays)) {
      return false;
    }

    for (let day of daysOfWeek) {
      if (!(day in workDays) || typeof workDays[day] !== "boolean") {
        return false;
      }
    }
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return "Work days must contain valid days of the week (Monday, Tuesday, ...) with boolean values (true/false).";
  }
}
