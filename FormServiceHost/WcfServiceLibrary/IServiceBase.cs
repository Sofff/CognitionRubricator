using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;

namespace WcfServiceLibrary
{
   [ServiceContract]
   public interface IServiceBase
   {
      [OperationContract]
      Dictionary<string, string> GetAllTemporaryWords(string _id);

      [OperationContract]
      Dictionary<string, string> GetTerms(string _id);

      [OperationContract]
      Dictionary<string, string> GetParents(string _id);

      [OperationContract]
      Dictionary<string, string> GetChilds(string _id);

      [OperationContract]
      string GetTemporaryTableWordDescription(string _id);

      [OperationContract]
      Dictionary<string, string> GetTermIDRubricks(string _id);

      [OperationContract]
      Dictionary<string, string> GetRelatedRubricsParents(string _id);

      [OperationContract]
      Dictionary<string, string> GetRelatedRubricsChilds(string _id);

      [OperationContract]
      Dictionary<string, string> GetAdditionalRubricInfo(string _id);

      [OperationContract]
      bool EditAdditionalRubricInfoDescription(string _id, string _dta);

      [OperationContract]
      bool EditAdditionalRubricInfoSign(string _id, string _dta);

      [OperationContract]
      bool EditAdditionalRubricInfoDocuments(string _id, string _dta);

      [OperationContract]
      bool EditAdditionalRubricInfoTerms(string _id, string _dta);



      //[OperationContract]
      //bool SetNewData(string _id, string _value);
   }
}
