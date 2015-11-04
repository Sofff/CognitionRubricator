using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml;

namespace LibraryParseDocuments
{
   public static class ParseFunctions
   {
      public static List<XmlTaxonomySVBR100Element> XmlTaxonomySVBR100(string xmlString)
      {
         List<XmlTaxonomySVBR100Element> list = new List<XmlTaxonomySVBR100Element>();

         using (XmlReader reader = XmlReader.Create(new StringReader(xmlString)))
         {
            while (reader.Read())
            {
               switch (reader.NodeType)
               {
                  case XmlNodeType.Element:
                     //writer.WriteStartElement(reader.Name);
                     break;
                  case XmlNodeType.Text:
                     //writer.WriteString(reader.Value);
                     break;
                  case XmlNodeType.XmlDeclaration:
                  case XmlNodeType.ProcessingInstruction:
                     //writer.WriteProcessingInstruction(reader.Name, reader.Value);
                     break;
                  case XmlNodeType.Comment:
                     //writer.WriteComment(reader.Value);
                     break;
                  case XmlNodeType.EndElement:
                     //writer.WriteFullEndElement();
                     break;
               }

            }
         }



         return list;
      }

   }
}
