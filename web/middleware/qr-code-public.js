/*
  Merchants need to be able to scan the QR Codes.
  This file provides the publicly available URLs to do that.
*/
import QRCode from "qrcode";

import { QRCodesDB } from "../qr-codes-db.js";
import { getQrCodeOr404 } from "../helpers/qr-codes.js";

import axios from "axios";

export default function applyQrCodePublicEndpoints(app) {
    /*
      The URL for a QR code image.
      The image is generated dynamically so that merhcanges can change the configuration for a QR code.
      This way changes to the QR code won't break the redirection.
    */
    app.get("/qrcodes/:id/image", async (req, res) => {
        const qrcode = await getQrCodeOr404(req, res, false);

        if (qrcode) {
            const destinationUrl = QRCodesDB.generateQrcodeDestinationUrl(qrcode);
            res
                .status(200)
                .set("Content-Type", "image/png")
                .set(
                    "Content-Disposition",
                    `inline; filename="qr_code_${qrcode.id}.png"`
                )
                .send(await QRCode.toBuffer(destinationUrl));
        }
    });

    /* The URL customers are taken to when they scan the QR code */
    app.get("/qrcodes/:id/scan", async (req, res) => {
        const qrcode = await getQrCodeOr404(req, res, false);

        if (qrcode) {
            res.redirect(await QRCodesDB.handleCodeScan(qrcode));
        }
    });
    /* The URL customers are taken to when they scan the QR code */
    app.get("/nft_service", async (req, res) => {
        try {
            const results = await Promise.resolve({ data: { "Welcome to the NFT Service": "Your test is successful" } })
            console.log("My results are????", results.data)
            res.status(200).send(results?.data);
        } catch (error) {
            res.status(500).send(error.message);
        }
    });
    /* The URL customers are taken to when they scan the QR code */
    app.get("/nft_service/token_clamied", async (req, res) => {
        try {
            const queryParameters = req.query
            const results = await Promise.resolve({ data: queryParameters })
            console.log("My results are????", results.data)
            res.status(200).send(results?.data);
        } catch (error) {
            res.status(500).send(error.message);
        }
    });
}
