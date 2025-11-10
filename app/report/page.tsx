"use client";
import dynamic from "next/dynamic";
const Comp = dynamic(() => import("../../components/ReportPage").then(m=>m.ReportPage || m.default), { ssr: false });
export default function Page(){ return <Comp />; }
