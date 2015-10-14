using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Channels;
using System.ServiceModel.Web;
using System.Text;
using ClassLibraryDBMethods;

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

      public static void Initialize(BaseDelegates.WriteToLog wl)
      {
         writeToLog = wl;

         if (dbMethods == null)
         {
            dbMethods = new DBMethods();
            FillTable();
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


      public static void FillTable()
      {
         try
         {
            dbMethods.FillTemporaryTableWords();
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
   }
}
