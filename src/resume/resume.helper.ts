import { Injectable } from "@nestjs/common";
import { profile } from "console";
import * as fs from 'fs';

@Injectable()

export class ResumeHelper {
    async convertResultToJSON(data: any) {
        return {
            basics: {
                name: data?.name || '',
                email: data?.email || '',
                phone: data?.phoneno || '',
                profiles: data?.profiles?.map((p: any) => ({
                    network: p?.platform || "",
                    url: p?.url || "",
                    username: p?.url || "",
                })) || [],
                location: {
                    address: data?.profiles
                        ?.find((p: any) => p.platform === "Location")
                        ?.url || "",
                },
                summary: data?.summary || "",
            },

            // ✅ Use the new universal skills mapper
            skills: await this.mapSkills(data),

            work: data?.experience?.map((exp: any) => ({
                company: exp?.company || "",
                position: exp?.title || "",
                startDate: exp?.dates?.split("–")[0]?.trim(),
                endDate: exp?.dates?.split("–")[1]?.trim(),
                location: exp?.location || "",
                highlights: exp?.description || [],
            })) || [],

            education: data?.education?.map((edu: any) => ({
                institution: edu?.institution || "",
                area: edu?.degree || "",
                startDate: edu?.dates?.split("–")[0]?.trim(),
                endDate: edu?.dates?.split("–")[1]?.trim(),
                score: edu?.percentage || "",
            })) || [],
        };
    }

    async saveResumeFile(jsonResume: any) {
        fs.writeFileSync('resume.json', JSON.stringify(jsonResume, null, 2));
    }

    async mapSkills(data: any) {
        if (!data?.skills) return [];

        // Case 1: AI returned a string
        if (typeof data.skills === "string") {
            return [
                {
                    name: "Skills",
                    keywords: data.skills
                        .split(",")
                        .map((s: string) => s.trim())
                        .filter(Boolean),
                },
            ];
        }

        // Case 2: AI returned an object with categories
        if (typeof data.skills === "object") {
            return Object.entries(data.skills).map(([name, value]) => ({
                name,
                keywords: Array.isArray(value)
                    ? value
                    : typeof value === "string"
                        ? value.split(",").map((s: string) => s.trim()).filter(Boolean)
                        : [],
            }));
        }

        return [];
    }
}