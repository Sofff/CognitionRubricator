using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryParseDocuments
{
   public class ParseElements
   {
   }

   public class XmlTaxonomySVBR100Element
   {
      public int ID { get; set; }
      public int ParentID { get; set; }
      public string UserSifr { get; set; }
      public string Content { get; set; }

      public XmlTaxonomySVBR100Element(int _id = -1, int _pid = -1, string _us = "", string _c ="")
      {
         ID = _id;
         ParentID = _pid;
         UserSifr = _us;
         Content = _c;
      }
   }
}
