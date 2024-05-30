import { RepositoryType } from "@/enums/repository-type.enum";
import { PackageType } from "@/enums/package-type.enum";
import { AlertType } from "@/enums/alert-type.enum";
import { AlertSource } from "@/enums/alert-source.enum";

export const configFileSchema = {
  type: "array",
  minItems: 1,
  items: {
    type: "object",
    properties: {
      name: { type: "string" },
      type: { type: "string", enum: Object.values(RepositoryType) },
      url: { type: "string" },
      description: { type: "string" },
      private: { type: "boolean" },
      auth: { type: "string" },
      fileToCheck: {
        type: "array",
        items: {
          type: "object",
          properties: {
            path: { type: "string" },
            type: { type: "string", enum: Object.values(PackageType) },
            ignorePackages: { type: "array", items: { type: "string" } }
          },
          required: ["path", "type"]
        }
      },
      alerts: {
        type: "array",
        items: {
          type: "object",
          properties: {
            type: { type: "string", enum: Object.values(AlertType) },
            source: { type: "string", enum: Object.values(AlertSource) },
            url: { type: "string" },
            title: { type: "string" },
            onlyIfUpdateNeeded: { type: "boolean" }
          },
          required: ["type", "source", "url"]
        },
        minItems: 1
      }
    },
    required: ["name", "type", "url", "fileToCheck", "alerts"]
  }
};