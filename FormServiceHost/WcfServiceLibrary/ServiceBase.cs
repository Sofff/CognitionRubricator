using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Channels;
using System.ServiceModel.Web;
using System.Text;
using LibraryDBMethods;

namespace WcfServiceLibrary
{
   public class ServiceBase : IServiceBase
   {
      private static DBMethods dbMethods;
      public static BaseDelegates.WriteToLog writeToLog;

      public ServiceBase() 
      {
         //if (dbMethods == null)
         //{
         //   dbMethods = new DBMethods();
         //   FillTable();
         //}
      }

      public static void Initialize(BaseDelegates.WriteToLog wl, string cs)
      {
         writeToLog = wl;

         if (dbMethods == null)
         {
            dbMethods = new DBMethods(cs);
            dbMethods.FillTables();
            if (writeToLog != null)
               writeToLog("Dataset filled.");
         }
      }


      [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, UriTemplate = "alltemporarywords/{_id}")]
      public Dictionary<string, string> GetAllTemporaryWords(string _id)
      {
         try
         {
            int id;
            if (!Int32.TryParse(_id, out id) || id < 0) return null;

            Dictionary<string, string> list = dbMethods.GetAllTemporaryWords();

            if (writeToLog != null)
               writeToLog("Client GetAllTemporaryWords: " + (OperationContext.Current.IncomingMessageProperties[RemoteEndpointMessageProperty.Name] as RemoteEndpointMessageProperty).Address);

            return list;
         }
         catch (Exception ex)
         {
            if (writeToLog != null)
               writeToLog(ex.ToString());
            return null;
         }
      }

      [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, UriTemplate = "terms/{_id}")]
      public Dictionary<string, string> GetTerms(string _id)
      {
         try
         {
            int id;
            if (!Int32.TryParse(_id, out id) || id < 0) return null;

            Dictionary<string, string> list = dbMethods.GetAllTerms();

            if (writeToLog != null)
               writeToLog("Client GetTerms: " + (OperationContext.Current.IncomingMessageProperties[RemoteEndpointMessageProperty.Name] as RemoteEndpointMessageProperty).Address);

            return list;
         }
         catch (Exception ex)
         {
            if (writeToLog != null)
               writeToLog(ex.ToString());
            return null;
         }
      }

      [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, UriTemplate = "parents/{_id}")]
      public Dictionary<string, string> GetParents(string _id)
      {
         try
         {
            int id;
            if (!Int32.TryParse(_id, out id) || id < 0) return null;

            Dictionary<string, string> list = new Dictionary<string, string>();

            //foreach (DS.TermsRow tr in dataSet.Terms.Rows)
            //   list.Add(tr.id.ToString(), tr.Name);

            if (writeToLog != null)
               writeToLog("Client GetParents: " + (OperationContext.Current.IncomingMessageProperties[RemoteEndpointMessageProperty.Name] as RemoteEndpointMessageProperty).Address);

            return list;
         }
         catch (Exception ex)
         {
            if (writeToLog != null)
               writeToLog(ex.ToString());
            return null;
         }
      }

      [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, UriTemplate = "childs/{_id}")]
      public Dictionary<string, string> GetChilds(string _id)
      {
         try
         {
            int id;
            if (!Int32.TryParse(_id, out id) || id < 0) return null;

            Dictionary<string, string> list = new Dictionary<string, string>();

            if (writeToLog != null)
               writeToLog("Client GetChilds: " + (OperationContext.Current.IncomingMessageProperties[RemoteEndpointMessageProperty.Name] as RemoteEndpointMessageProperty).Address);

            return list;
         }
         catch (Exception ex)
         {
            if (writeToLog != null)
               writeToLog(ex.ToString());
            return null;
         }
      }

      [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, UriTemplate = "temporarytableworddescription/{_id}")]
      public string GetTemporaryTableWordDescription(string _id)
      {
         try
         {
            int id;
            if (!Int32.TryParse(_id, out id) || id < 0) return null;

            string result = dbMethods.GetTemporaryTableWordDescription(id);

            if (writeToLog != null)
               writeToLog("Client GetTemporaryTableWordDescription: " + (OperationContext.Current.IncomingMessageProperties[RemoteEndpointMessageProperty.Name] as RemoteEndpointMessageProperty).Address);

            return result;
         }
         catch (Exception ex)
         {
            if (writeToLog != null)
               writeToLog(ex.ToString());
            return null;
         }
      }

      [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, UriTemplate = "gettermidrubricks/{_id}")]
      public Dictionary<string, string> GetTermIDRubricks(string _id)
      {
         try
         {
            int id;
            if (!Int32.TryParse(_id, out id) || id < 0) return null;

            Dictionary<string, string> list = dbMethods.GetTermIDRubricks(id);

            if (writeToLog != null)
               writeToLog("Client GetTermIDRubricks: " + (OperationContext.Current.IncomingMessageProperties[RemoteEndpointMessageProperty.Name] as RemoteEndpointMessageProperty).Address);

            return list;
         }
         catch (Exception ex)
         {
            if (writeToLog != null)
               writeToLog(ex.ToString());
            return null;
         }
      }

      [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, UriTemplate = "getrelatedrubricsparents/{_id}")]
      public Dictionary<string, string> GetRelatedRubricsParents(string _id)
      {
         try
         {
            int id;
            if (!Int32.TryParse(_id, out id) || id < 0) return null;

            Dictionary<string, string> list = dbMethods.GetRelatedRubricsParents(id);

            if (writeToLog != null)
               writeToLog("Client GetRelatedRubricsParents: " + (OperationContext.Current.IncomingMessageProperties[RemoteEndpointMessageProperty.Name] as RemoteEndpointMessageProperty).Address);

            return list;
         }
         catch (Exception ex)
         {
            if (writeToLog != null)
               writeToLog(ex.ToString());
            return null;
         }
      }

      [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, UriTemplate = "getrelatedrubricschilds/{_id}")]
      public Dictionary<string, string> GetRelatedRubricsChilds(string _id)
      {
         try
         {
            int id;
            if (!Int32.TryParse(_id, out id) || id < 0) return null;

            Dictionary<string, string> list = dbMethods.GetRelatedRubricsChilds(id);

            if (writeToLog != null)
               writeToLog("Client GetRelatedRubricsChilds: " + (OperationContext.Current.IncomingMessageProperties[RemoteEndpointMessageProperty.Name] as RemoteEndpointMessageProperty).Address);

            return list;
         }
         catch (Exception ex)
         {
            if (writeToLog != null)
               writeToLog(ex.ToString());
            return null;
         }
      }

      [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, UriTemplate = "getadditionalrubricinfo/{_id}")]
      public Dictionary<string, string> GetAdditionalRubricInfo(string _id)
      {
         try
         {
            int id;
            if (!Int32.TryParse(_id, out id) || id < 0) return null;

            Dictionary<string, string> list = dbMethods.GetAdditionalRubricInfo(id);

            if (writeToLog != null)
               writeToLog("Client GetAdditionalRubricInfo: " + (OperationContext.Current.IncomingMessageProperties[RemoteEndpointMessageProperty.Name] as RemoteEndpointMessageProperty).Address);

            return list;
         }
         catch (Exception ex)
         {
            if (writeToLog != null)
               writeToLog(ex.ToString());
            return null;
         }
      }

      [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, UriTemplate = "editadditionalrubricinfodescription/{_id}&{_dta}")]
      public bool EditAdditionalRubricInfoDescription(string _id, string _dta)
      {
         try
         {
            int id;
            if (!Int32.TryParse(_id, out id) || id < 0 || _dta == null || _dta.Length == 0) return false;

            dbMethods.EditAdditionalRubricInfoDescription(id, _dta);

            if (writeToLog != null)
               writeToLog("Client EditAdditionalRubricInfoDescription: " + (OperationContext.Current.IncomingMessageProperties[RemoteEndpointMessageProperty.Name] as RemoteEndpointMessageProperty).Address);

            return true;
         }
         catch (Exception ex)
         {
            if (writeToLog != null)
               writeToLog(ex.ToString());
            return false;
         }
      }

      [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, UriTemplate = "editadditionalrubricinfosign/{_id}&{_dta}")]
      public bool EditAdditionalRubricInfoSign(string _id, string _dta)
      {
         try
         {
            int id;
            if (!Int32.TryParse(_id, out id) || id < 0 || _dta == null || _dta.Length == 0) return false;

            dbMethods.EditAdditionalRubricInfoSign(id, _dta);

            if (writeToLog != null)
               writeToLog("Client EditAdditionalRubricInfoSign: " + (OperationContext.Current.IncomingMessageProperties[RemoteEndpointMessageProperty.Name] as RemoteEndpointMessageProperty).Address);

            return true;
         }
         catch (Exception ex)
         {
            if (writeToLog != null)
               writeToLog(ex.ToString());
            return false;
         }
      }

      [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, UriTemplate = "editadditionalrubricinfodocuments/{_id}&{_dta}")]
      public bool EditAdditionalRubricInfoDocuments(string _id, string _dta)
      {
         try
         {
            int id;
            if (!Int32.TryParse(_id, out id) || id < 0 || _dta == null || _dta.Length == 0) return false;

            dbMethods.EditAdditionalRubricInfoDocuments(id, _dta);

            if (writeToLog != null)
               writeToLog("Client EditAdditionalRubricInfoDocuments: " + (OperationContext.Current.IncomingMessageProperties[RemoteEndpointMessageProperty.Name] as RemoteEndpointMessageProperty).Address);

            return true;
         }
         catch (Exception ex)
         {
            if (writeToLog != null)
               writeToLog(ex.ToString());
            return false;
         }
      }

      [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, UriTemplate = "editadditionalrubricinfoterms/{_id}&{_dta}")]
      public bool EditAdditionalRubricInfoTerms(string _id, string _dta)
      {
         try
         {
            int id;
            if (!Int32.TryParse(_id, out id) || id < 0 || _dta == null || _dta.Length == 0) return false;

            dbMethods.EditAdditionalRubricInfoTerms(id, _dta);

            if (writeToLog != null)
               writeToLog("Client EditAdditionalRubricInfoTerms: " + (OperationContext.Current.IncomingMessageProperties[RemoteEndpointMessageProperty.Name] as RemoteEndpointMessageProperty).Address);

            return true;
         }
         catch (Exception ex)
         {
            if (writeToLog != null)
               writeToLog(ex.ToString());
            return false;
         }
      }

      [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, UriTemplate = "getttermtthesauruslistbyid/{_id}&{_ft}")]
      public List<TTermTThesaurus> GetTTermTThesaurusListById(string _id, string _ft)
      {
         try
         {
            int id;
            int ift;
            FindType ft;
            if (!Int32.TryParse(_id, out id) || id < 0 || !Enum.TryParse(_ft, out ft)) return null;

            List<TTermTThesaurus> list = dbMethods.GetTTermTThesaurusListById(id, ft);

            if (writeToLog != null)
               writeToLog("Client GetTTermTThesaurusListById: " + (OperationContext.Current.IncomingMessageProperties[RemoteEndpointMessageProperty.Name] as RemoteEndpointMessageProperty).Address);

            return list;
         }
         catch (Exception ex)
         {
            if (writeToLog != null)
               writeToLog(ex.ToString());
            return null;
         }
      }

      [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, UriTemplate = "getttermtthesaurusnormalbyid/{_id}&{_lv}&{_ln}")]
      public TTermTThesaurusNormal GetTTermTThesaurusNormalById(string _id, string _lv, string _ln)
      {
         try
         {
            int id, lv ,ln;
            if (!Int32.TryParse(_id, out id) || id < 0 || !Int32.TryParse(_lv, out lv) || !Int32.TryParse(_ln, out ln)) return null;

            TTermTThesaurusNormal ret = dbMethods.GetTTermTThesaurusNormalById(id, lv, ln);

            if (writeToLog != null)
               writeToLog("Client GetTTermTThesaurusNormalById: " + (OperationContext.Current.IncomingMessageProperties[RemoteEndpointMessageProperty.Name] as RemoteEndpointMessageProperty).Address);

            return ret;
         }
         catch (Exception ex)
         {
            if (writeToLog != null)
               writeToLog(ex.ToString());
            return null;
         }
      }

      [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, UriTemplate = "gettermtextrubricks/{_text}")]
      public Dictionary<string, string> GetTermTextRubricks(string _text)
      {
         try
         {
            if (_text == null || _text.Length < 2) return null;

            Dictionary<string, string> list = dbMethods.GetTermTextRubricks(_text);

            if (writeToLog != null)
               writeToLog("Client GetTermTextRubricks: " + (OperationContext.Current.IncomingMessageProperties[RemoteEndpointMessageProperty.Name] as RemoteEndpointMessageProperty).Address);

            return list;
         }
         catch (Exception ex)
         {
            if (writeToLog != null)
               writeToLog(ex.ToString());
            return null;
         }
      }

      [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, UriTemplate = "getttermtthesauruslistbytext/{_text}&{_ft}")]
      public List<TTermTThesaurus> GetTTermTThesaurusListByText(string _text, string _ft)
      {
         try
         {
            int ift;
            FindType ft;
            if (_text == null || _text.Length < 2 || !Enum.TryParse(_ft, out ft)) return null;

            List<TTermTThesaurus> list = dbMethods.GetTTermTThesaurusListByText(_text, ft);

            if (writeToLog != null)
               writeToLog("Client GetTTermTThesaurusListByText: " + (OperationContext.Current.IncomingMessageProperties[RemoteEndpointMessageProperty.Name] as RemoteEndpointMessageProperty).Address);

            return list;
         }
         catch (Exception ex)
         {
            if (writeToLog != null)
               writeToLog(ex.ToString());
            return null;
         }
      }
        




      public static void FillTable()
      {
         try
         {
            dbMethods.FillTables();
            if (writeToLog != null)
               writeToLog("Dataset filled.");
         }
         catch (Exception ex)
         {
            if (writeToLog != null)
               writeToLog(ex.ToString());
         }
      }

      public bool SetNewData(string _id, string _value)
      {
         if (_value == null)
            throw new ArgumentNullException("composite");

         int id;
         if (Int32.TryParse(_id, out id) && id < 0)
            return true;

         return false;
      }


      //[WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, UriTemplate = "gettermtthesaurusrelationshipslist/{_id}&{_lvl}")]
      //public List<TTermTThesaurusRelationship> GetTTermTThesaurusRelationshipsList(string _id, string _lvl)
      //{
      //   try
      //   {
      //      int id;
      //      int lvl;
      //      if (!Int32.TryParse(_id, out id) || id < 0 || !Int32.TryParse(_lvl, out lvl)) return null;

      //      List<TTermTThesaurusRelationship> list = dbMethods.GetTTermTThesaurusRelationshipsList(id, lvl);

      //      if (writeToLog != null)
      //         writeToLog("Client GetTTermTThesaurusRelationshipsList: " + (OperationContext.Current.IncomingMessageProperties[RemoteEndpointMessageProperty.Name] as RemoteEndpointMessageProperty).Address);

      //      return list;
      //   }
      //   catch (Exception ex)
      //   {
      //      if (writeToLog != null)
      //         writeToLog(ex.ToString());
      //      return null;
      //   }
      //}
   }
}
