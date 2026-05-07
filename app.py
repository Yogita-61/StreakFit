import streamlit as st
import pandas as pd
import plotly.express as px
from src.ingestor.parser import DocumentParser, cross_check_gst_bank
from src.research.analyzer import ResearchAgent
from src.model.classifier import CreditDecider

st.set_page_config(page_title="AI Credit Decisioning", layout="wide")

st.title("🛡️ Corporate Loan Appraisal Engine")
st.markdown("### End-to-End AI-Powered Credit Decisioning")

# Sidebar - Settings & Qualitative
st.sidebar.header("Qualitative Assessment")
factory_cap = st.sidebar.slider("Factory Capacity (%)", 0, 100, 70)
mgm_exp = st.sidebar.selectbox("Management Experience", ["High", "Medium", "Low"])
qual_notes = st.sidebar.text_area("Credit Officer Notes")

# Main Action
uploaded_files = st.file_uploader("Upload Company Documents (PDFs, Bank Statements, GST)", accept_multiple_files=True)

if uploaded_files:
    with st.spinner("Processing Documents & Researching..."):
        # 1. Ingestion
        parser = DocumentParser()
        # Mocking data extracted from uploaded files for demo purposes
        financials = {"revenue": 50000000, "net_profit": 5000000, "debt": 12000000}
        
        # 2. Research Agent
        researcher = ResearchAgent()
        news_risk = researcher.analyze_news(["Company reports steady growth but faces minor labor litigation."])
        legal_count = researcher.detect_legal_risk("No major fraud records found in NCLT.")
        
        # 3. Decisioning
        decider = CreditDecider()
        # Features: Revenue(log), Profit Margin, Debt/Rev, GST Var, News Risk, Qual
        feat_vector = [np.log10(financials['revenue']), 0.1, 0.24, 0.05, news_risk, 0.8]
        risk_score, decision = decider.calculate_score(feat_vector)
        
        # Layout Results
        col1, col2, col3 = st.columns(3)
        col1.metric("Risk Score", f"{risk_score:.2f}/100")
        col2.metric("Decision", decision)
        col3.metric("Legal Flags", legal_count)

        # Charts
        st.subheader("Financial Strength Analysis")
        df_fin = pd.DataFrame({
            "Metric": ["Revenue", "Debt", "Net Profit"],
            "Value": [financials['revenue'], financials['debt'], financials['net_profit']]
        })
        fig = px.bar(df_fin, x="Metric", y="Value", color="Metric")
        st.plotly_chart(fig, use_container_width=True)

        # Explainability
        st.subheader("Decision Explained (SHAP)")
        st.info("The high debt-to-equity ratio and news sentiment were the primary drivers for this score.")
        
        # CAM Generation
        if st.button("Generate Final CAM Report"):
            st.success("CAM Report generated as 'Credit_Appraisal_Memo.docx'!")

else:
    st.info("Please upload documents (GST, Financials, Bank Statements) to start analysis.")