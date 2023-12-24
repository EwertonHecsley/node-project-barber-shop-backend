/* eslint-disable prettier/prettier */
import { PartialType } from "@nestjs/mapped-types";
import CreateExpertsDto from "./create.experts";

export default class UpdateExpertDto extends PartialType(CreateExpertsDto) { };