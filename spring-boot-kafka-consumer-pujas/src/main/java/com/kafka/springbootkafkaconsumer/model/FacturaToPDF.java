package com.kafka.springbootkafkaconsumer.model;


import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.StringReader;
import java.util.Date;
import java.util.List;

import org.apache.axis.encoding.Base64;

import com.itextpdf.text.Document;
import com.itextpdf.text.Image;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.pdf.PdfContentByte;
import com.itextpdf.text.pdf.PdfWriter;
import com.itextpdf.tool.xml.XMLWorkerHelper;



public class FacturaToPDF {

    public static Boolean ObtenerPDF(String path, FacturaModel factura)
    {
        try {
            // List<Concepto> articulos = factura.getConceptos();
            
            
            // String letraFactura=factura.getTipoComprobante().getCodigo();
            String  numeroFactura=String.valueOf(factura.getIdFactura());
            // String  fechaFactura=factura.getFechaComprobante().toString();
            String  fechaFactura= java.time.LocalDate.now().toString();
            String  nombreCliente=factura.getNombreComprador()+" "+factura.getApellidoComprador();
            String  domicilioCliente= "factura.getClienteComprobante().getDomicilio()";
            String  localidadCliente= "Localidad";
            String  condicionIvaCliente= "";
            String  condicionVenta="factura.getConceptosAIncluir().getDescripcion()";
            String  cuitCliente="factura.getClienteComprobante().getDocumento()";
            String  cae = "";
            String  fechaVto = "";
            String  subtotal="String.valueOf(factura.getImporteNeto())";
            String  impuesto="String.valueOf(factura.getImporteTributos())";
            String  porcentajeIva= "21";
            String  totalIva="";
            String  total="String.valueOf(factura.getImporteTotal())";
            String  discriminaIva="",htmlFacturaAsociada="";
        

//            if(factura.getFacturaAsociada() != 0){
//                htmlFacturaAsociada = "<label> Factura asociada: "+factura.getFacturaAsociada()+"</label>";
//            }
            Document document = new Document(PageSize.A4,60, 60, 50, 50);
            PdfWriter pdfWriter = PdfWriter.getInstance(document, new FileOutputStream(path));
            document.open();
            document.addAuthor("Sistema facturacion");
            document.addCreator("Sistema facturacion");
            document.addSubject("Asunto del documento");
            //document.setPageSize(PageSize.A4);
            //document.setMargins()

            document.addCreationDate();
            document.addTitle("Factura");

            XMLWorkerHelper worker = XMLWorkerHelper.getInstance();
            
//            String encodedfile = null;
//            try {
//            	File file = new File(imagenFondo);
//                FileInputStream fileInputStreamReader = new FileInputStream(file);
//                byte[] bytes = new byte[(int)file.length()];
//                fileInputStreamReader.read(bytes);
//                encodedfile = Base64.encode(bytes).toString();
//                fileInputStreamReader.close();
//            } catch (FileNotFoundException e) {
//                // TODO Auto-generated catch block
//                e.printStackTrace();
//            } catch (IOException e) {
//                // TODO Auto-generated catch block
//                e.printStackTrace();
//            }

            String str =
            		"<html xmlns=\"http://www.w3.org/1999/xhtml\">"+
            				"<head>"+
            				    "<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />"+
            				    "<meta/>"+
            				    "<title>Comprobante</title>"+
            				    "<style type=\"text/css\">"+
            				        ".nombre {"+
            				            "font-family: -apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,Oxygen-Sans,Ubuntu,Cantarell,\"Helvetica Neue\",sans-serif;"+
            				            "font-size: 42px;"+
            				            "color: rgb(0, 0, 0);"+
            				        "}"+
            				        ".nombre2 {"+
            				           "font-family: -apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,Oxygen-Sans,Ubuntu,Cantarell,\"Helvetica Neue\",sans-serif;"+
            				           "font-size: 24px;"+
            				        "}"+
            				        ".nombre3 {"+
            				            "font-size: 18px;"+
            				            "font-weight: bold;"+
            				            "font-family: -apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,Oxygen-Sans,Ubuntu,Cantarell,\"Helvetica Neue\",sans-serif;"+
            				        "}"+
            				        ".nombre5 {"+
            				            "font-size: 14px;"+
            				            "font-weight: bold;"+
            				            "font-family: -apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,Oxygen-Sans,Ubuntu,Cantarell,\"Helvetica Neue\",sans-serif;"+
            				        "}"+
            				        ".nombre6 {"+
            				            "font-size: 36px;"+
            				            "font-weight: bold;"+
            				            "font-family: -apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,Oxygen-Sans,Ubuntu,Cantarell,\"Helvetica Neue\",sans-serif;"+
            				        "}"+
            				        ".nombre4 {"+
            				            "font-weight: bold;"+
            				            "font-family: -apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,Oxygen-Sans,Ubuntu,Cantarell,\"Helvetica Neue\",sans-serif;"+
            				        "}"+
            				        ".nombre7 {"+
            				            "font-size: 18px;"+
            				            "font-family: -apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,Oxygen-Sans,Ubuntu,Cantarell,\"Helvetica Neue\",sans-serif;"+
            				        "}"+
            				        ".codigoBarra {"+
            				            "padding-left: 10px;"+
            				            "margin-left: 10px;"+
            				            "padding-top:10px;"+
            				            "margin-top: 10px"+
            				        "}"+
            				        ".nombre4 {"+
            				            "font-weight: bold;"+
            				            "font-size: 24px;"+
            				        "}"+
            				        "encabezadoComun {"+
            				            "font-style: normal;"+
            				        "}"+
            				        "#form1 .nombre4 {"+
            				            "font-weight: normal;"+
            				        "}"+
            				        "#form1 .nombre4 {"+
            				            "font-style: normal;"+
            				        "}"+
            				        ".tabla-factura {"+
            				            "border-collapse:collapse;"+
            				        "}"+
            				        ".detalleEmisor {"+
            				            "margin-left:20px;"+
            				            "margin-bottom:10px"+
            				        "}"+
            				        ".detalleEmisorUltimo {"+
        				            "margin-left:20px;"+
        				        "}"+
            				        ".trEncabezado {"+
            				            "padding-top:20px;"+
            				            "padding-bottom:20px"+
            				        "}"+
            				        ".trCae {"+
            				            "padding-right:30px;"+
            				            "padding-top:20px;"+
            				        "}"+
            				        ".detalleActividades {"+
            				        	"margin-bottom:10px"+
        				            "}"+
            				    "</style>"+
            				"</head>"+

							 "<body>"+
							 "<table width=\"870\" align=\"center\" height=\"159\" class=\"tabla-factura\" border=\"1\">"+
							 "  <tr style=\"line-height: 85%;\">"+
							 "    <td class=\"trEncabezado\" width=\"424\">" +
							 "<br></br><br></br><br></br>"+
							 "<p align=\"center\" class=\"nombre3\"></p>"+
							 "<p class=\"nombre2 detalleEmisor\">"+factura.getNombreVendedor()+
							 "</p>"+
							 "<p class=\"detalleEmisor\">"+"domicilio"+"</p>"+
							 "<p class=\"detalleEmisor\">"+"vendedor.getLocalidad()"+"</p>"+
							 "<p class=\"detalleEmisor\">Tel: "+"vendedor.getTelefono()"+"</p>"+
							 "<p class=\"detalleEmisor\">"+"vendedor.getCondicionIVA()"+"</p></td>"+
                            "<td width=\"424\">";
                        

                            str = str +"      <p class=\"detalleActividades\" align=\"center\"><strong>Fecha: </strong>"+fechaFactura+"</p>"+
                            "      <p class=\"detalleActividades\" align=\"center\"><strong>C.U.I.T: </strong>"+"vendedor.getCuit()"+"</p>"+
                            "      <p class=\"detalleActividades\" align=\"center\"><strong>Ingresos Brutos: </strong>"+"vendedor.getIngresosBrutos()"+"</p>"+
                            "      <p class=\"detalleActividades\" align=\"center\"><strong>Inicio de Actividades: </strong>"+"vendedor.getInicioActividades()"+"</p>"+
                            "	   </td>"+
                            "  </tr>"+
                            "</table>"+
                            "<table class=\"tabla-factura\" align=\"center\" width=\"870\" border=\"1\">"+
                            " <tr>"+
                            "    <td class=\"trEncabezado\" height=\"88\"><p class=\"detalleEmisor\"><strong>Se�or(es):</strong> "+factura.getNombreComprador()+" " +factura.getApellidoComprador()+"</p>"+
                            "    <p class=\"detalleEmisor\"><strong>Domicilio:</strong> "+"domicilioCliente"+"</p>"+
                            "    <p class=\"detalleEmisorUltimo\"><strong>Localidad:</strong> "+"localidadCliente"+"</p></td>"+
                            "  </tr>"+
                            "</table>"+
                            "<table class=\"tabla-factura\" align=\"center\" width=\"870\" height=\"77\" border=\"1\">"+
                            "  <tr>"+
                            "    <td class=\"trEncabezado\"><p class=\"detalleEmisor\"><strong>I.V.A:</strong> "+"condicionIvaCliente"+"</p>"+
                            "    <p class=\"detalleEmisorUltimo\"><strong>Condicion de venta:</strong> "+"condicionVenta"+"</p></td>"+
                            "    <td class=\"trEncabezado\"><p class=\"detalleEmisorUltimo\"><strong>C.U.I.T:</strong> "+"cuitCliente"+"</p>"+
                            "    </td>"+
                            "  </tr>"+
                            "</table>"+
                            "<table class=\"tabla-factura\" align=\"center\" width=\"870\" border=\"1\">"+
                            "  <tr>"+
                            "    <td width=\"106\"><div class=\"nombre5\" align=\"center\">CANTIDAD</div></td>"+
                            "    <td width=\"520\"><div class=\"nombre5\" align=\"center\">DESCRIPCION</div></td>";
                            // if(esFactura){
                            //     str = str + "   <td width=\"100\"><div class=\"nombre5\" align=\"center\">PRECIO UNITARIO</div></td>"+
                            //             "    <td width=\"110\"><div class=\"nombre5\" align=\"center\">IMPORTE</div></td>" ;
                            // }
                            str = str + "  </tr>"+
                            ArticulosToString(factura.getProductos(), true) + "</table>";
                             if(true){
                                str = str +
                                        "<table class=\"tabla-factura\" width=\"870\" border=\"1\">"+
                                        "  <tr>"+
                                        "    <td width=\"313\"><div align=\"center\"><strong>Sub-Total</strong></div></td>"+
                                        "discriminaIva" +
                                        "    <td width=\"313\"><div align=\"center\"><strong>TOTAL $</strong></div></td>"+
                                        "  </tr>"+
                                        "  <tr>"+
                                        "    <td align=\"right\">"+"subtotal"+"</td>"+
                                        "totalIva"+
                                        "    <td align=\"right\">"+"total"+"</td>"+
                                        "  </tr>"+
                                        "</table>"+
                                        "<table class=\"tabla-factura\" width=\"870\" border=\"1\">"+
                                        "  <tr>"+
                                        "    <td class=\"trCae\">"+
                                        "      <p class=\"nombre7 detalleEmisor\" align=\"right\"><strong>"+
                                        "          C.A.E:</strong> "+"cae"+"&nbsp;&nbsp;&nbsp;"+
                                        "        </p>"+
                                        "      <p class=\"nombre7 detalleEmisor\" align=\"right\"><strong>"+
                                        "          Fecha de Vencimiento:</strong> "+"fechaVto"+"&nbsp;&nbsp;&nbsp;"+
                                        "        </p>"+
                                        //htmlFacturaAsociada+"<br/>"+
                                        //"<br/>" +
                                        //"<br/>"+
                                        "        <div align=\"center\" class=\"codigoBarra\"> <img hspace=\"2\" class=\"codigoBarra\" height=\"50\" width=\"500\" src=\""+"codigoBarra"+"\"></img> </div> "+
                                        "    <p>&nbsp; </p></td>"+
                                        "  </tr>"+
                                        "</table>";
                            }

                            str = str + "<p>&nbsp;</p>"+
                            "</body>"+
                            "</html>";

            worker.parseXHtml(pdfWriter, document, new StringReader(str));
            PdfContentByte canvas = pdfWriter.getDirectContentUnder();
            // Image image = Image.getInstance(imagenFondo);
            // image.scaleAbsolute(40, 40);
            // image.setAbsolutePosition(150, 740);
            canvas.reset();
            // canvas.addImage(image);
            document.close();
            return true;
        }
        catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    private static String ArticulosToString(List<ProductoModel> articulos,boolean esFactura)
    {
        String articulosString="";
        int contadorRenglones = 0;
        for(ProductoModel art: articulos)
        {
            contadorRenglones++;
            articulosString=articulosString+
                    "  <tr>"+
                    "    <td align=\"right\">"+art.getCantidad()+"</td>"+
                    "    <td>"+art.getNombre()+"</td>";
                    if(esFactura){
                        articulosString = articulosString + "    <td align=\"right\">"+art.getPrecio()+"</td>"+
                                "    <td align=\"right\">"+art.getPrecio()*art.getCantidad()+"</td>";
                    }
                    articulosString = articulosString + "  </tr>";
        	}

        if(contadorRenglones<13)
        {
            for(int i=contadorRenglones-1;i<13;i++)
            {
                articulosString=articulosString+
                        "  <tr>"+
                        "    <td>&nbsp;</td>"+
                        "    <td>&nbsp;</td>";
                        if(esFactura) {
                            articulosString = articulosString + "    <td>&nbsp;</td>" +
                                    "    <td>&nbsp;</td>" ;
                        }
                        articulosString = articulosString +"  </tr>";
            }
        }

        return articulosString;

    }

}
