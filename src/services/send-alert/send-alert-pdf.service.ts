import fs from "fs";
import PDFDocument from "pdfkit";
import { IAlert } from "@/interfaces/repository.interface";
import { IPackage } from "@/interfaces/package.interface";

export const sendAlertPdfService = async (alert: IAlert, update: IPackage[]): Promise<void> => {
    let doc = new PDFDocument({ size: "A4", margin: 50 });

    doc
        .fontSize(25)
        .text(alert.title);

    update.forEach((up) => {
		const deprecatedMessage = up.deprecated ? "[DEPRECATED] " : "";
        const newSection = `${deprecatedMessage}${up.package} is out of date (${up.releaseType}): - Current version : ${up.current} - Last version : ${up.version}\n`;

        doc
            .fontSize(10)
            .text(newSection)
    })

    doc.end();
    doc.pipe(fs.createWriteStream("update.pdf"));
};